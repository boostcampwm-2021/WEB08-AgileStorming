import React, { useState, useRef, ChangeEvent } from 'react';
import { NewProjectCard, TextInputModal } from 'components/organisms';
import * as Api from 'utils/api';

interface IProps {}

const NewProjectModalWrapper: React.FC<IProps> = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const projectName = useRef<string>('');
  const handleClickPlusButton = () => {
    setModalVisible((isModalVisible) => !isModalVisible);
  };
  const handleClickOverlay = () => {
    setModalVisible(false);
  };
  const handleClickSubmitButton = () => {
    if (!projectName.current) return;
    Api.project.create(projectName.current);
    projectName.current = '';
    setModalVisible(false);
  };
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    projectName.current = event.target.value;
  };
  return (
    <>
      <NewProjectCard
        onClickPlusButton={handleClickPlusButton}
        modal={
          <TextInputModal
            onClickSubmitButton={handleClickSubmitButton}
            onClickOverlay={handleClickOverlay}
            onClickChangeInput={handleChangeInput}
            text={'새로운 프로젝트 만들기'}
            placeholder={'프로젝트 이름'}
            visible={isModalVisible}
          />
        }
      />
    </>
  );
};

export default NewProjectModalWrapper;
