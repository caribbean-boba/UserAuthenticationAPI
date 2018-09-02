/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var levenshteinDistance = function (s1, s2) {
	if (!s1 || s1.length == 0) return s2.length;
	if (!s2 || s2.length == 0) return s1.length;

    const m = s1.length;
    const n = s2.length;
    const dp = [];
    // initialize 2d array
    for (let i = 0; i <= m; i++) {
        dp[i] = [];
    }   
    // initialization for edit distance
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    // dp to fill out the table to perform insert, delete and replace
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, 
                    dp[i][j - 1] + 1,
                    dp[i - 1][j] + 1);
            }
        }
    }
    return dp[m][n];
};

console.assert(levenshteinDistance('','') === 0);
console.assert(levenshteinDistance('','abcd') === 4);
console.assert(levenshteinDistance('abcd','') === 4);
console.assert(levenshteinDistance('abcd','bcde') === 2);
console.assert(levenshteinDistance('meilenstein','levenshtein') === 4);
console.assert(levenshteinDistance('levenshtein','meilenstein') === 4);