import type { GetTableAssignmentsResponse } from "../../../features/admin/session-table/model/GetTableAssignmentsResponse";

export const buildTableingResultHtml = (
  sessionId: number,
  round: "round1" | "round2",
  tables: GetTableAssignmentsResponse["round1Tables"]
) => {
  const roundLabel = round === "round1" ? "Round 1" : "Round 2";

  const tableCardsHtml = tables
    .map((table) => {
      const membersHtml = table.members
        .map(
          (member) => `
              <div class="member">
                <span class="member-name">${member.nickname}</span>
                <span class="member-level">Lv.${member.level}</span>
              </div>
                `
        )
        .join("");

      return `
          <section class="card">
            <div class="card-header">
              <h2 class="table-title">${table.tableNo}조</h2>
              <span class="badge">${table.members.length}명</span>
            </div>
            <div class="member-list">
              ${membersHtml}
            </div>
          </section>
        `;
    })
    .join("");

  return `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${roundLabel} Table Assignment</title>
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 32px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
            background: #f5f7fb;
            color: #1f2937;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            margin-bottom: 24px;
          }
          .title {
            margin: 0 0 8px;
            font-size: 28px;
            font-weight: 800;
          }
          .subtitle {
            margin: 0;
            color: #6b7280;
            font-size: 15px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            padding: 18px;
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
          }
          .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f5f9;
          }
          .table-title {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 56px;
            height: 30px;
            padding: 0 10px;
            border-radius: 999px;
            background: #eff6ff;
            color: #2563eb;
            font-size: 13px;
            font-weight: 700;
          }
          .member-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .member {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 14px;
            border-radius: 14px;
            background: #f8fafc;
            border: 1px solid #eef2f7;
          }
          .member-name {
            font-size: 15px;
            font-weight: 700;
          }
          .member-level {
            font-size: 13px;
            font-weight: 700;
            color: #475569;
            background: #e2e8f0;
            padding: 6px 10px;
            border-radius: 999px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">${roundLabel} 테이블 배치 결과</h1>
            <p class="subtitle">세션 ${sessionId} · ${roundLabel} · 테이블별 참가자 목록</p>
          </div>
          <div class="grid">
            ${tableCardsHtml}
          </div>
        </div>
      </body>
      </html>
    `;
};
