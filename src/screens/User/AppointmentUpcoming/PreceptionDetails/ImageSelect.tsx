import {paper} from '@assets';

export const getFileIcon = (file, fileIcons) => {
  if (!file || !file.name) {
    return paper;
  }

  const fileType = file.name.split('.').pop();
  if (fileType === 'pdf') {
    return fileIcons.pdf;
  } else if (fileType === 'doc' || fileType === 'docx') {
    return fileIcons.document;
  } else {
    return paper;
  }
};
