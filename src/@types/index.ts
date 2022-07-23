export interface IReplyTransfer {
    date: object,
    name: string,
    organization: string,
    matter_detail: string
}

export interface IReply {
    application_id: string,
    reply_time: object,
    reply_mode: string,
    reply_from: number,
    reply_type: string,
    reply_file: string,
    reply_transfer: boolean,
    reply_3party_details: IReplyTransfer[],
}

export interface IApplicationListItem {
    id?: string,
    userid?: string,
    applicant_name: string,
    application_date?: Object,
    mode_of_payment?: string,
    payment_ref_no?: string,
    application_topic?: string,
    application_time?: Object,
    application_admin?: string,
    application_closed?: boolean,
    reply_viewed?: boolean,
    replies?: IReply[]
}