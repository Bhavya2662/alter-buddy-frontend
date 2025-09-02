export interface IAgoraUserProps {
  path: string;
  uri: string;
  timestamp: TimeRanges;
  entities: [
    {
      uuid: string;
      type: string;
      created: TimeRanges;
      modified: TimeRanges;
      username: string;
      activated: boolean;
    }
  ];
  count: number;
  action: string;
  duration: number;
}

export interface ISendMessageProps {
  from: "user" | "admin";
  to: string;
  type: "txt" | "img" | "audio" | "video" | "file" | "loc" | "cmd" | "custom";
  body: any;
  sync_device?: boolean;
  ext?: {
    em_ignore_notification?: boolean;
  };
}
