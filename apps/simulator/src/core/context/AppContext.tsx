import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SsrData } from '../types/ssrData';
import { hooks, datatypes } from '@repo/core-library';
import { useRouter } from 'next/router';
import { CalcItemSelectResponseItem, ItemSelectTypes } from '@repo/core-library/types';
import { useAccessToken } from '@repo/core-library/contexts/auth/hooks';
import { useBusinessQueryContext } from '@repo/core-library/contexts';
import { UnauthorizedDialog } from '@/components/Dialog/UnauthorizedDialog';

type AppContextValue = {
  questionaire: SsrData['questionaire'];
  loading?: boolean;
  setLoader: any;
  hasAccessToken: boolean;
  itemselect: datatypes.CalcItemSelectResponseItem[];
  displayNextItem: boolean;
  setDisplayNextItem: any;
  selectedItem: CalcItemSelectResponseItem[];
};

type Ssr = {
  data?: any;
};

const ApplicationContext = createContext<AppContextValue>(undefined as any);

export const ApplicationProvider: React.FC<React.PropsWithChildren<Ssr>> = ({ children, data }) => {
  /**
   * @deprecated
   * this useState not necessary.
   */
  const [questionaire, setQuestionaire] = useState<SsrData['questionaire']>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [hasAccessToken, setHasAccessToken] = useState<boolean>(false);
  const [displayNextItem, setDisplayNextItem] = useState<boolean>(false);
  const router = useRouter();
  const isInitialMount = useRef(true);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const questionData: ItemSelectTypes = {
    accountId: '5A637337-33EC-41AF-A903-4192514B9561',
    examGroupId: '0930C751-AC22-4895-8D76-2EF0B1FC90D9',
    shouldDisplayNextItem: displayNextItem,
  };
  const { businessQueryLoadPreProcess, businessQuerySelectQuestions } = useBusinessQueryContext();
  const { refetch: loadPreProcess } = businessQueryLoadPreProcess(['loadpreprocess']);
  const {
    refetch: loadSelectionQuestion,
    data: selectQuestionData,
    isLoading,
  } = businessQuerySelectQuestions(['selectquestion'], questionData);

  // Prevent re-render of selectQuestionCb.execute({ ...questionData }) on initial mount
  const [accessToken, setAccessToken] = useAccessToken();

  const preProccessor = useCallback(async () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      accessToken && loadPreProcess();
      setHasAccessToken(true);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    preProccessor();
  }, [accessToken]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      accessToken && loadSelectionQuestion();
    }
  }, [accessToken]);

  const selectedItem = useMemo(() => {
    const data = selectQuestionData;

    if (!Array.isArray(data)) {
      console.error('Expected an array for selectQuestionData, but received:', data);
      return [];
    }

    return mapQuestions(data);
  }, [selectQuestionData]);

  const initSelectedQuestion = useCallback(() => {
    accessToken && loadSelectionQuestion();
  }, [accessToken]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (router.pathname === '/next-item') {
        setReloadTrigger(prevState => !prevState);
      }
    };

    router.events.on('routeChangeComplete', initSelectedQuestion);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', initSelectedQuestion);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [initSelectedQuestion, router]);

  return (
    <ApplicationContext.Provider
      value={{
        questionaire,
        loading: isLoading,
        setLoader,
        hasAccessToken,
        itemselect: selectedItem,
        setDisplayNextItem,
        displayNextItem,
        selectedItem,
      }}
    >
      <UnauthorizedDialog open={!accessToken} />
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  if (!ApplicationContext) {
    throw new Error('Application context must used.');
  }
  return useContext(ApplicationContext);
};

function mapQuestions(questions: CalcItemSelectResponseItem[]) {
  if (!Array.isArray(questions)) {
    console.error('Expected an array for questions, but received:', questions);
    return [];
  }

  return questions.map(question => ({
    lNum: question.lNum,
    qId: question.qId,
    hasContainer: question.hasContainer,
    question: question.question,
    actionKey: question.actionKey,
    cnCateg: question.cnCateg,
    correct: question.correct,
    choices: question.choices,
    typeOfQuestion: question.typeOfQuestion,
  }));
}
