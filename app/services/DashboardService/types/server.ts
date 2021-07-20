export interface ServerStatisticData {
  data: Data;
  /** messege là tin nhắn trả lại trên server*/
  message: string;
  status: string;
}

export interface Data {
  /** title **/
  type: string;
  /** summary là tổng số lượng clicks dựa theo filter*/
  summary: number;
  /** timeline data */
  timeline: TimeLine[];

  [key: string]: any;
}

export interface TimeLine {
  id: string;
  /** summary là số lượng clicks dựa theo filter (ví dụ là tổng số clicks cuả 1 tháng trong filter 4 tháng trước)*/
  summary: number;
  /** value cua timeline */
  from: string;
  /** value cua timeline */
  to?: string;
}
