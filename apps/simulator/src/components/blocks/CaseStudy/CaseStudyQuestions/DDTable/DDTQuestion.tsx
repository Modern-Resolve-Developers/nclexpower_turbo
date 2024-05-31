import { QuestionaireProps, AnswerProps, DDTProps } from "@/core/types/ssrData";
import React from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import { DDTable } from "./DDTable";
import {
    Paper,
    Grid,
 } from '@mui/material';
 import { getMapItems } from "@/core/utils/contents";

export const DDTableQuestion: React.FC<DDTProps> = ({ questionaire, answer, selectedValues, handleSelectChange }) => {

    const { columnName, selectFieldKey,  selectField} = getMapItems(answer)

  return (
    <div className="p-2 py-2 h-full">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sm={6} md={6}>
                        <div className='h-full w-full p-4'>
                            {questionaire &&
                                questionaire.map((questionItem: QuestionaireProps) => (
                                    <div key={questionItem.qId} className='w-full'>
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
                                    </div>
                                ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <div className='h-full w-full p-5'>
                        {answer &&
                            answer.map((answerItem: AnswerProps) => (
                                <>
                                    <div key={answerItem.answerId} className='w-full text-sm mb-4 pr-5 pt-4'>
                                        <p className="flex"><NearMeIcon className='h-6 rotate-45 text-[#86BCEA] mr-2 pb-1'/><div dangerouslySetInnerHTML={{ __html: answerItem.answerInstruction }} /></p>
                                    </div>
                                    <DDTable
                                        selectedValues={selectedValues}
                                        handleSelectChange={handleSelectChange} 
                                        columns={columnName} 
                                        selectFieldKeys={selectFieldKey} 
                                        selectFieldOptions={selectField}
                                    />
                                    <div className='w-full text-sm mb-4 pr-5 pt-4 flex gap-1'> 
                                        <p>{answerItem.note === ""? "" : "Note:"}</p>
                                        <p>{answerItem.note}</p>
                                    </div>                      
                                </>
                            ))}
                        </div>
                    </Grid>
            </Grid>
        </div>
  );  
};