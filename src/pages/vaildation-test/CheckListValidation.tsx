export const valiCheckListLength = (checkList: any[]) => {
    if (checkList.length < 1) {
        alert('체크된 항목이 없습니다.')
        return false
    }
}
