import { withSsrHttpClient } from "@repo/utils";
import { NextApiHandler } from "next";
import { datatypes } from "@repo/utils";

const handler: NextApiHandler = withSsrHttpClient(
  (client) => async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "MethodNotAllowedException",
      });
    }

    try {
      const result = await client.post<datatypes.CalcItemSelectResponseItem[]>(
        "/BaseCentralized/calc-cumulatives",
        req.body as datatypes.RegularAnswer
      );
      res.status(result.status).json(result.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export default handler;