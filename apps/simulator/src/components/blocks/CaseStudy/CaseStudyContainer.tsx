import React from "react";
import { QuestionaireProps, CaseStudyProps } from "@/core/types/ssrData";
import { useAlertMessageV2 } from "@repo/utils/contexts/AlertMessageContext";
import { HCPQuestion, MRSNQuestion, DDCQuestion, DDTQuestion, MCQCSQuestionnaire, DNDQuestionaire } from "./CaseStudyQuestions";



import { SATAQuestionaire } from "./CaseStudyQuestions/SATAQuestionaire";
export const CaseStudyContainer: React.FC<CaseStudyProps> = ({
  questionaire,
}) => {
  const { AlertMessage } = useAlertMessageV2();

  if (questionaire.length > 0) {
    const deserializeContents: any =
      questionaire?.length > 0 &&
      questionaire?.filter((cms: QuestionaireProps) => {
        return cms.QType === "SATA";
      });

    const {
      QType: QuestionType,
      answer,
      hasAlert,
      qId,
    } = deserializeContents?.[0];

    if (hasAlert) {
      return (
        <>
          <AlertMessage
            severity="info"
            title={`Case Study: Item ${qId}`}
            description=""
          />
          {renderSwitch(QuestionType, deserializeContents, answer)}
        </>
      );
    } else {
      return renderSwitch(QuestionType, deserializeContents, answer);
    }
  }
  return <h3>No questionaire Loaded</h3>;
};

function renderSwitch(
  QuestionType: string,
  deserializeContents: any,
  answer: any
) {
  switch (QuestionType) {

    case "SATA":
      return <SATAQuestionaire questionaire={deserializeContents} />
    case "MCQNoGroup":
    case "MCQGroup":
      return <MCQCSQuestionnaire questionaire={deserializeContents} />
    case "HCP":
      return <HCPQuestion questionaire={deserializeContents} answer={answer} />
    case "MRSN":
      return <MRSNQuestion questionaire={deserializeContents} answer={answer} />
    case "DDC":
      return <DDCQuestion questionaire={deserializeContents} answer={answer} />
    case "DDT":
      return <DDTQuestion questionaire={deserializeContents} answer={answer} />
    case "DND1":
      return <DNDQuestionaire questionaire={deserializeContents} />

    default:
      return <h3>No questionaire Loaded</h3>;
  }
}

