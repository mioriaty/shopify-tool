import { Result } from 'app/models/PostMessageResult';

export type StatisticDetailStatus = 'active' | 'deactive';

export interface StatisticDetailModel {
  /** Id của popup*/
  id: string;
  /** Id của popup*/
  title: string;
  /** Icon(LineAwesome) của popup*/
  goal: 'email' | 'email_wheel' | 'email_social' | 'social_follows' | 'target_url';
  /** Lượng view của popup*/
  views: string;
  /** Lượng click của popup*/
  clicks: string;
  /** Lượng subscribers của popup*/
  subscribers: string;
  /** Tỷ lệ chuyển đổi của popup*/
  conversion: string;
  /** Trạng thái hiển thị của popup*/
  status: StatisticDetailStatus;
  /** Ngày tạo của popup*/
  date: string;
  /** Config của popup*/
  config?: Result;
}

export interface ServerStatisticDetail {
  status: Status;
  data: {
    items: StatisticDetailModel[];
    maxPages: number;
  };
}

export interface CreatePopupData {
  config: Result;
  shopName: string;
  title: string;
  status: string;
}
