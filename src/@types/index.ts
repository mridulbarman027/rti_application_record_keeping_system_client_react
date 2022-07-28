export interface IReplyTransfer {
    date: object,
    name: string,
    organization: string,
    matter_details: string
}

export interface IReply {
    id: string,
    application_id: string,
    reply_time: object,
    reply_from: number,
    reply_from_name: string,
    reply_from_id: string,
    reply_type: string,
    reply_file: string,
}

export interface IApplicationListItem {
    id?: string,
    userid?: string,
    applicant_name: string,
    application_date?: string,
    mode_of_payment?: string,
    payment_ref_no?: string,
    application_topic?: string,
    application_time?: string,
    application_admin?: string,
    application_closed?: boolean,
    reply_viewed?: boolean,
    reply_3party: boolean,
    reply_3party_details: IReplyTransfer,
    replies?: IReply[]
}