import { AxiosInstance } from "axios";
import {
  CalcItemSelectResponseItem,
  RegularAnswer,
  ItemSessionTypes,
} from "../../types";

export class ServerSideApi {
  constructor(private readonly axios: AxiosInstance) {}
}
