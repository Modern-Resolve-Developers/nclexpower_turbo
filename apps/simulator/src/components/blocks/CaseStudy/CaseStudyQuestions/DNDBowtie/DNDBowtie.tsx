import React, { useEffect, useState } from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Grid, Paper, Typography } from '@mui/material';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DNDBowtieValidationType, RowSchema } from '@/core/schema/dndbowtie/validation';
import { DraggableCard } from './DNDBowtieComponent/DraggableCard';
import { DroppableContainer } from './DNDBowtieComponent/Droppable';
import { dndObjectValueProps, QuestionaireProps, AnswerProps, choicesListProps, DropContainerType, DropContainerItem } from '@/core/types/ssrData';
import { dropContainers, initialContainerState } from '@/core/constant/dndStateConstant';
import { getMapItems } from '@/core/utils/contents';
import { useFormSubmissionBindingHooks } from '@repo/core-library/hooks';

type DroppedValueType = Record<string, dndObjectValueProps[]>

type Props = {
  questionaire: QuestionaireProps[];
  answer: AnswerProps[];
  handleSubmit: (values: DNDBowtieValidationType) => void
  dndBowtieAtom: DNDBowtieValidationType | undefined
}

export const DNDBowtie: React.FC<Props> = ({ questionaire, answer, handleSubmit, dndBowtieAtom }) => {
  const { choicesLists } = getMapItems(answer)
  const [answerLists, setAnswerList] = useState<choicesListProps[]>(choicesLists);
  const [droppedValue, setDroppedValue] = useState<DroppedValueType>(initialContainerState);
  const dropContainer: DropContainerType = dropContainers;


  const form = useForm<DNDBowtieValidationType>({
    mode: 'all',
    resolver: zodResolver(RowSchema),
  })

  const { control, setValue } = form
  const formState = useFormState({ control: control })
  const { dndbowtie: dndbowtieError } = formState.errors

  useFormSubmissionBindingHooks({
    key: 'DNDBowtie',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [dndBowtieAtom],
  })

  useEffect(() => {
    setValue('dndbowtie', droppedValue)
  }, [droppedValue])

  const removeValue = (id: number, container: string, setState: any) => {
    setState((prevState: any) => {
      const updatedState = { ...prevState };
      updatedState[container] = updatedState[container].filter((block: { id: number }) => block.id !== id);
      return updatedState;
    });
  };

  const addValue = (value: dndObjectValueProps) => {
    setAnswerList((prevState: any) => {
      const updatedState = { ...prevState };
      if (!updatedState[value.container]?.some((values: dndObjectValueProps) => values.id === value.id)) {
        updatedState[value.container] = updatedState[value.container] ? [...updatedState[value.container], value] : [value];
      }
      return updatedState;
    });
  }

  const dropAnswer = (containerName: string, value: dndObjectValueProps) => {
    const { id, container } = value
    setDroppedValue(prevState => {
      if (prevState[containerName].length > 0) {
        const currentValue = prevState[containerName];
        addValue(currentValue[0])
      }

      return {
        ...prevState,
        [containerName]: [value]
      };
    });
    removeValue(id, container, setAnswerList)
  };

  const handleRemove = (containerName: string, item: dndObjectValueProps) => {
    const { id } = item
    removeValue(id, containerName, setDroppedValue)
    addValue(item)
  };


  return (
    <div className="p-2 py-2 overflow-y-auto">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid item xs={12} sm={12} md={5.5}>
          <div className='h-full w-full p-4'>
            {questionaire &&
              questionaire.map((questionItem: QuestionaireProps) => (
                <div key={questionItem.qId} className='w-full' >
                  <div className='w-full text-sm mb-4 pr-5 pt-4'>
                    <p>{questionItem.question}</p>
                  </div>
                  <div className='w-full'>
                    {questionItem.tabs &&
                      questionItem.tabs.map((tab) => (
                        <>
                          <div className='flex gap-1'>
                            <div
                              key={tab.tabsId}
                              className='bg-white w-fit px-5 py-1 rounded-t-md text-sm font-semibold flex items-center mb-[-3px]'
                            >
                              <p>{tab.tabsTitle}</p>
                            </div>
                          </div>
                          <Paper elevation={3} className='p-5 overflow-auto flex flex-col gap-5' style={{ maxHeight: '70vh' }}>
                            <div key={tab.tabsId} className=' h-[45vh] flex w-full gap-2'>
                              <p className='font-semibold min-w-[50px]'>{tab.tabsId} :</p>
                              <div className='leading-6 text-sm'>{typeof tab.content === "string" && tab.content}</div>
                            </div>
                          </Paper>
                        </>
                      ))}
                  </div>
                </div>)
              )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6.5}>
          <div className='h-full w-full p-5 '>
            {answer &&
              answer.map((answerItem: AnswerProps) => (
                <>
                  <div key={answerItem.answerId} className='w-full text-sm mb-4 pr-5 pt-4'>
                    <p className="flex"><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1' />
                      <div dangerouslySetInnerHTML={{ __html: answerItem.answerInstruction }} />
                    </p>
                  </div>
                  <div className="flex gap-5 flex-col">
                    <div className="flex justify-evenly items-center gap-2">
                      <div className="flex flex-col gap-4">
                        {dropContainer.slice(0, 2).map((items: DropContainerItem, index: number) => (
                          <DroppableContainer
                            key={index}
                            errorMessage={dndbowtieError && dndbowtieError[items.container]?.message}
                            accept={items.accepts}
                            text={items.text}
                            onDrop={(item: dndObjectValueProps) => dropAnswer(items.container, item)}
                            droppedValue={droppedValue[items.container]}
                            bg="bg-[#BCE4E4]"
                            handleRemove={() => handleRemove(items.container, droppedValue[items.container][0])}
                          />
                        )
                        )}
                      </div>
                      <div className="flex justify-center items-center">
                        <DroppableContainer
                          accept={dropContainer[2].accepts}
                          errorMessage={dndbowtieError && dndbowtieError[dropContainer[2].container]?.message}
                          text={dropContainer[2].text}
                          onDrop={(item: dndObjectValueProps) => dropAnswer(dropContainer[2].container, item)}
                          droppedValue={droppedValue[dropContainer[2].container]}
                          bg="bg-[#6DCFF6]"
                          handleRemove={() => handleRemove(dropContainer[2].container, droppedValue[dropContainer[2].container][0])}
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        {dropContainer.slice(3).map((items: DropContainerItem, index: number) => (
                          <DroppableContainer
                            errorMessage={dndbowtieError && dndbowtieError[items.container]?.message}
                            key={index}
                            accept={items.accepts}
                            text={items.text}
                            onDrop={(item: dndObjectValueProps) => dropAnswer(items.container, item)}
                            droppedValue={droppedValue[items.container]}
                            bg="bg-[#E0E0DF]"
                            handleRemove={() => handleRemove(items.container, droppedValue[items.container][0])}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-evenly items-start">
                      <div className="flex ">
                        {answerItem.choicesListKey.map((listKey: any, index: number) => (
                          <div key={index} className="min-w-[180px] bg-[#E6F2FF]">
                            <Typography variant='subtitle1' sx={{ color: "#1f1f1f", textAlign: "center", padding: "8px" }}>{listKey}</Typography>
                            <div className="flex flex-col gap-2 p-2">
                              {answerLists[listKey] && answerLists[listKey].map((item: dndObjectValueProps) => (
                                <DraggableCard
                                  key={item.id}
                                  answer={item}
                                  type={item.container}
                                  icon={false}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='w-full text-sm mb-4 pr-5 pt-4 flex gap-1'>
                    <p>{answerItem.note === "" ? "" : "Note:"}</p>
                    <p>{answerItem.note}</p>
                  </div>
                </>
              ))}
          </div>
        </Grid>
      </Grid>
    </div >
  );
};