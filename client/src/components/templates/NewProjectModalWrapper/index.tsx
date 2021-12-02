import React, { useRef, ChangeEvent } from 'react';
import { NewProjectCard } from 'components/organisms';
import useModal from 'hooks/useModal';
import { IProject } from 'pages/Project';
import { API } from 'utils/api';

interface IProps {
  addNewProject: (newProject: IProject) => void;
}

const NewProjectModalWrapper: React.FC<IProps> = ({ addNewProject }) => {
  const { showModal, hideModal } = useModal();
  const projectName = useRef<string>('');

  const handleClickSubmitButton = async () => {
    if (!projectName.current) return;
    const newProject = await API.project.create(projectName.current);
    projectName.current = '';
    addNewProject(newProject);
    hideModal();
  };
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    projectName.current = event.target.value;
  };
  const handleClickPlusButton = () => {
    showModal({
      modalType: 'textInputModal',
      modalProps: {
        title: '새 프로젝트 만들기',
        text: '새 프로젝트의 이름을 입력해주세요',
        placeholder: '프로젝트 이름',
        onChangeInput: handleChangeInput,
        onClickSubmitButton: handleClickSubmitButton,
      },
    });
  };

  return <NewProjectCard onClickPlusButton={handleClickPlusButton} />;
};

export default NewProjectModalWrapper;
