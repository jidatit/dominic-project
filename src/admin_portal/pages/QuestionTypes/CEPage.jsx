import React, { useState, useEffect, useMemo } from 'react'
import { Box, TextField } from '@mui/material';
import Modal from '@mui/material/Modal'
import { MaterialReactTable } from 'material-react-table';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../../db';
import { FaPlus } from "react-icons/fa";

const CEPage = () => {
  const [CEQuestionsData, setCEQuestionsData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [NewQuestion, setNewQuestion] = useState('');
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const MAX_QUESTIONS = 10;

  const handleOpenModal = (rowData) => {
    setSelectedRowData(rowData);
    setEditedQuestion(rowData.question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      if (editedQuestion.length > 5) {
        const docRef = doc(db, 'CEQuestions', selectedRowData.id);
        await updateDoc(docRef, {
          question: editedQuestion
        });
        const updatedData = CEQuestionsData.map(item =>
          item.id === selectedRowData.id ? { ...item, question: editedQuestion } : item
        );
        setCEQuestionsData(updatedData);
        setIsModalOpen(false);
      }
      else {
        alert("Question(s) cannot be shorter than length of 5 chars.")
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleAddQuestion = () => {
    if (CEQuestionsData.length < MAX_QUESTIONS) {
      setIsAddQuestionModalOpen(true);
    } else {
      alert('You cannot add more than 20 questions.');
    }
  };

  const handleSaveNewQuestion = async () => {
    try {
      if (NewQuestion.length > 5) {
        const docRef = await addDoc(collection(db, 'CEQuestions'), { question: NewQuestion });
        const newQuestion = { id: docRef.id, question: NewQuestion };
        setCEQuestionsData([...CEQuestionsData, newQuestion]);
        setIsAddQuestionModalOpen(false);
        setNewQuestion("");
      }
      else {
        alert("Question(s) cannot be shorter than length of 5 chars.")
        return
      }
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CEcollection = collection(db, 'CEQuestions');
        const snapshot = await getDocs(CEcollection);
        const Data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCEQuestionsData(Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'question',
        header: 'Question',
        size: 500,
        Cell: ({ cell }) => (
          <Box >
            {cell.getValue().length > 120 ? (`Q. ${cell.row.index + 1}. ${cell.getValue().slice(0, 120)}`) + '...' : (`Q. ${cell.row.index + 1}. ${cell.getValue()}`)}
          </Box>
        )
      },
      {
        header: 'Actions',
        size: 100,
        Cell: ({ cell }) => (
          <Box display="flex" alignItems="center" gap="18px">
            <button
              onClick={() => handleOpenModal(cell.row.original)}
              className='bg-transparent rounded-[18px] px-[10px] py-[4px] text-[#6D00F8] text-[14px]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </button>
          </Box>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <div className='w-full flex flex-col justify-center items-center'>
        {CEQuestionsData ? (
          <div className="table bg-white p-5 rounded-md w-full">
            <div className='w-full bg-[#6D00F8] text-white font-semibold p-2 rounded-t-md flex flex-col justify-start items-start'>
              <p>Current Questions</p>
            </div>
            <MaterialReactTable
              columns={columns}
              data={CEQuestionsData}
            />
          </div>) : (CEQuestionsData)}

        <button onClick={handleAddQuestion} className='mt-[20px] flex flex-row justify-center items-center gap-2 text-[20px] text-white lg:w-[33%] cursor-pointer w-full bg-[#6D00F8] rounded-[33px] text-center font-bold py-2 px-4'>Add New Question <FaPlus /></button>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '80%' }}>
            <TextField
              label="Question"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              fullWidth
              multiline
            />
            <Box mt={2} display="flex" gap="5px" justifyContent="flex-end">
              <button className='bg-[#2187A2] px-6 py-2 rounded-[33px] text-white font-bold' onClick={handleSaveChanges}>Save</button>
              <button className='bg-[#a22121] px-6 py-2 rounded-[33px] text-white font-bold' onClick={handleCloseModal}>Close</button>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={isAddQuestionModalOpen}
          onClose={() => setIsAddQuestionModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '80%' }}>
            <TextField
              label="Question"
              value={NewQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              fullWidth
              multiline
            />
            <Box mt={2} display="flex" gap="5px" justifyContent="flex-end">
              <button className='bg-[#2187A2] px-6 py-2 rounded-[33px] text-white font-bold' onClick={handleSaveNewQuestion}>Add</button>
              <button className='bg-[#a22121] px-6 py-2 rounded-[33px] text-white font-bold' onClick={() => setIsAddQuestionModalOpen(false)}>Close</button>
            </Box>
          </Box>
        </Modal>

      </div>
    </>
  )
}

export default CEPage