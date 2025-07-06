import {
	ageToLabel,
	calcScoreByReps,
	calcScoreByTime,
	decideGrade,
	parseCsv,
} from "./logic";

import file from "../../public/csv/５５～５９歳_女性_令和元年６月２７日.csv?raw";

describe("CSV を用いたテスト", () => {
	let table: ReturnType<typeof parseCsv>;

	beforeAll(async () => {
		table = parseCsv(file);
	});

	it("腕立て 35 回 → 99 点", () => {
		expect(calcScoreByReps(table, 35, "pushups")).toBe(99);
	});

	it("腕立て 21 回 → 80 点（81点が空）", () => {
		expect(calcScoreByReps(table, 21, "pushups")).toBe(80);
	});

	it("腹筋 57 回 → 100 点（限界以上）", () => {
		expect(calcScoreByReps(table, 57, "situps")).toBe(100);
	});

	it("腹筋 0 回 → 0 点", () => {
		expect(calcScoreByReps(table, 0, "situps")).toBe(0);
	});

	it("3km 1535 秒 → 0 点", () => {
		expect(calcScoreByTime(table, 1535)).toBe(0);
	});

	it("3km 902 秒 → 100 点", () => {
		expect(calcScoreByTime(table, 902)).toBe(100);
	});
});

describe("年齢→ラベル", () => {
	it("24歳→１５～２４歳", () => {
		expect(ageToLabel(24)).toBe("１５～２４歳");
	});
	it("65歳→undefined", () => {
		expect(ageToLabel(65)).toBeUndefined();
	});
});

describe("等級判定", () => {
	it("最小得点 92 → 2 級", () => {
		expect(decideGrade(92)).toBe("2級");
	});
	it("最小得点 40 → 級外", () => {
		expect(decideGrade(40)).toBe("級外");
	});
});

describe("CSV パース", () => {
	const csv = `得点,腕立,腹筋,3Km走
	100,52,70,737
	90,45,60,760`;
	it("行数 2 を読み込む", () => {
		const rows = parseCsv(csv);
		expect(rows).toHaveLength(2);
		expect(rows[0].score).toBe(100);
	});
});
