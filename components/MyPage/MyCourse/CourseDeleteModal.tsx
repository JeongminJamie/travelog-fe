import React from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';

import classNames from 'classnames/bind';
import styles from './CourseDeleteModal.module.css';

import Image from 'next/image';
import exit from '../../../assets/exit.png';

const cx = classNames.bind(styles);
interface Props {
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  getMyCourse: () => void;
}

const CourseDeleteModal: React.FC<Props> = ({ isDeleteOpen, setIsDeleteOpen, id, getMyCourse }) => {
  //user clike the delete button & axios delete
  const clickDeleteHandler = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/routes/delete/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.status === 200) {
          console.log('내 여행 경로 삭제 성공', response.status);
          setIsDeleteOpen(true);
          getMyCourse();
        } else {
          console.log('내 여행 경로 삭제 실패', response.status);
        }
      } catch (error) {
        console.error('내 여행 경로 삭제 요청 중 에러', error);
      }
    }
  };

  if (!isDeleteOpen) return null;

  return createPortal(
    <div className={cx('delete-overlays')}>
      <div className={cx('delete-modal-container')}>
        <div className={cx('delete-exit-icon')}>
          <Image src={exit} alt="exit" className={cx('exit-icon')} onClick={() => setIsDeleteOpen(false)} />
        </div>
        <div className={cx('check-deletion')}>이 여행 경로를 삭제하시겠어요?</div>
        <div className={cx('delete-buttons-container')}>
          <button className={cx('cancel-button')} onClick={() => setIsDeleteOpen(false)}>
            취소
          </button>
          <button className={cx('delete-button')} onClick={clickDeleteHandler}>
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('overlays-modal')!
  );
};

export default CourseDeleteModal;
