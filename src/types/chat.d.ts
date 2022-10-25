declare type IChat = {
    id: string
    memberId: string
    memberName: string
    images: string[]
    content: string

    createdAt: string
    isDeleted: boolean
    deletedAt: string
}
