import {
	type ScoreRow,
	ageToLabel,
	calcScoreByReps,
	calcScoreByTime,
	decideGrade,
	parseCsv,
} from "./logic";

const formEl = document.querySelector<HTMLFormElement>("form");
const resultBox = document.getElementById("result");

if (!formEl || !(formEl instanceof HTMLFormElement)) {
	throw new Error("フォームが見つかりませんでした");
}
if (!resultBox) {
	throw new Error("結果表示用の要素が見つかりませんでした");
}

async function loadCsv(path: string): Promise<ScoreRow[]> {
	try {
		const txt = await fetch(path).then((r) => r.text());
		return parseCsv(txt);
	} catch (e) {
		console.error("CSV の読み込みに失敗:", e);
		throw e;
	}
}

formEl.addEventListener("submit", async (ev) => {
	ev.preventDefault();
	const fd = new FormData(formEl);

	const gender = fd.get("gender") as string;
	const age = Number(fd.get("age"));
	const pushups = Number(fd.get("pushups"));
	const situps = Number(fd.get("situps"));
	const runMin = Number(fd.get("run_minutes"));
	const runSec = Number(fd.get("run_seconds"));

	const runTotalSec = runMin * 60 + runSec;

	try {
		/* 入力チェック */
		if (!gender || !age) throw new Error("性別と年齢を入力してください。");

		const ageLabel = ageToLabel(age);
		if (!ageLabel) throw new Error("対応する年齢区分がありません。");

		/* スコア表 */
		const csvPath = `/csv/${ageLabel}_${gender}_令和元年６月２７日.csv`;
		const table = await loadCsv(csvPath);

		/* 得点 */
		const pushScore = calcScoreByReps(table, pushups, "pushups");
		const sitScore = calcScoreByReps(table, situps, "situps");
		const runScore = calcScoreByTime(table, runTotalSec);
		const minScore = Math.min(pushScore, sitScore, runScore);
		const grade = decideGrade(minScore);

		/* 表示 */
		resultBox.innerHTML = `
        <p class="mb-2">
          腕立て：<span class="font-semibold">${pushScore}</span> 点 ／
          腹筋：<span class="font-semibold">${sitScore}</span> 点 ／
          3km走：<span class="font-semibold">${runScore}</span> 点
        </p>
        <p class="text-2xl">
          判定結果：<span class="text-red-600">${grade}</span>
        </p>`;
	} catch (err: unknown) {
		console.error(err);
		resultBox.textContent =
			err instanceof Error ? err.message : "予期せぬエラーが発生しました。";
	}
});

const clearBtn = document.getElementById("clearBtn");

if (!clearBtn) {
	throw new Error("クリアボタンが見つかりませんでした");
}

clearBtn.addEventListener("click", () => {
	formEl.reset();
	resultBox.innerHTML = "";
});
