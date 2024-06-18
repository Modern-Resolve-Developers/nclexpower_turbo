import { AxiosInstance } from "axios";
import {
  Header,
  QuestionContentsPayload,
  QuestionContentsResponse,
} from "../../types";

export class PreloadedGlobalsApi {
  constructor(private readonly axios: AxiosInstance) {}
  public getPreloadedGlobalsHeader(props: { LNum: string; accountId: string }) {
    return this.axios.get<Header[]>(
      `/v1/api/baseAppload/get-preloaded-globals-header/${props.LNum}/${props.accountId}`
    );
  }
  public getAllContentsQuestion(props: QuestionContentsPayload) {
    return this.axios.post<QuestionContentsResponse>(
      "/v1/api/baseAppload/get-all-contents-question",
      props
    );
  }
}
