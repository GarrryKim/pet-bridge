import {deleteUser, patchReport} from "api/users-api"

const AdminReport = ({report}) => {
  const disableUser = (userId) => {
    if (confirm(`${userId} 유저의 회원 정보를 삭제하시겠습니까?`))
      deleteUser(userId)
  }

  const patchReportStatus = (reportId) => {
    if (
      confirm(`신고 번호 ${reportId} 의 신고 처리 상태를 변경하시겠습니까?`)
    ) {
      patchReport(reportId)
    }
  }

  const onClickDisableHandler = (userId) => {
    disableUser(userId)
  }

  const onClickPatchHandler = (reportId) => {
    patchReportStatus(reportId)
  }

  return (
    <tr className="border-2">
      <td>{report.userId}</td>
      <td>{report.reportType}</td>
      <td>{report.reason}</td>
      <td>
        <button
          onClick={() => onClickDisableHandler(report.userId)}
          className="rounded-lg p-1 outline outline-alert hover:bg-alert"
        >
          회원 삭제
        </button>
      </td>
      <td>
        <button
          onClick={() => onClickPatchHandler(report.id)}
          className="rounded-lg p-1 outline outline-alert hover:bg-alert"
        >
          신고 처리
        </button>
      </td>
    </tr>
  )
}

export default AdminReport
