export interface ScoreRow {
	score: number;
	pushups: number;
	situps: number;
	run: number;
}

export type AgeBracket = { min: number; max: number; label: string };

export const AGE_BRACKETS: AgeBracket[] = [
	{ min: 15, max: 24, label: "１５～２４歳" },
	{ min: 25, max: 29, label: "２５～２９歳" },
	{ min: 30, max: 34, label: "３０～３４歳" },
	{ min: 35, max: 39, label: "３５～３９歳" },
	{ min: 40, max: 44, label: "４０～４４歳" },
	{ min: 45, max: 49, label: "４５～４９歳" },
	{ min: 50, max: 54, label: "５０～５４歳" },
	{ min: 55, max: 59, label: "５５～５９歳" },
	{ min: 60, max: 64, label: "６０～６４歳" },
];

export function ageToLabel(age: number): string | undefined {
	return AGE_BRACKETS.find((b) => age >= b.min && age <= b.max)?.label;
}

export const GRADES = [
	{ grade: "1級", min: 94 },
	{ grade: "2級", min: 86 },
	{ grade: "3級", min: 78 },
	{ grade: "4級", min: 73 },
	{ grade: "5級", min: 68 },
	{ grade: "6級", min: 60 },
	{ grade: "7級", min: 45 },
];

/**
 * 回数に基づいてスコアを計算します。
 * @param table スコアテーブル（回数の降順でソート済みであることが前提）
 * @param reps 実際の回数
 * @param field 対象フィールド（pushups または situps）
 * @returns 計算されたスコア
 */
export function calcScoreByReps(
	table: ScoreRow[],
	reps: number,
	field: "pushups" | "situps",
): number {
	for (const row of table) {
		const value = row[field];
		// 無効値（undefinedやNaN）をスキップ
		if (typeof value !== "number" || Number.isNaN(value)) continue;

		if (reps >= value) return row.score;
	}
	return 0;
}

/**
 * 時間に基づいてスコアを計算します。
 * @param table スコアテーブル（時間の昇順でソート済みであることが前提）
 * @param sec 実際の時間（秒）
 * @returns 計算されたスコア
 */
export function calcScoreByTime(table: ScoreRow[], sec: number): number {
	for (const row of table) if (sec <= row.run) return row.score;
	return 0;
}

export function decideGrade(minScore: number): string {
	return GRADES.find((g) => minScore >= g.min)?.grade ?? "級外";
}

export function parseCsv(text: string): ScoreRow[] {
	return text
		.trim()
		.split(/\r?\n/)
		.slice(1)
		.map((l) => {
			const [s, p, si, r] = l.split(",");
			return {
				score: Number.parseInt(s),
				pushups: Number.parseInt(p),
				situps: Number.parseInt(si),
				run: Number.parseInt(r),
			};
		});
}
