import { Result } from 'app/models/PostMessageResult';

export type SmartBarServiceStatus = 'active' | 'deactive';

export interface SmartBarServiceModel {
  /** Id của popup*/
  id: string;
  /** title của popup*/
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
  status: SmartBarServiceStatus;
  /** Ngày tạo của popup*/
  date: string;
  /** Config của popup*/
  config?: Result;
}

export interface ServerSmartBarService {
  status: Status;
  data: {
    items: SmartBarServiceModel[];
    maxPages: number;
  };
}

export interface CreateSmartBarData {
  config: Result;
  shopName: string;
  title: string;
}
