import { FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';

type FunctionType = () => void;

export interface PopoverContentProps {
  /* Mội dung edit title của Popover */
  editTitle?: ReactNode;
  /* Mội dung edit của Popover */
  editContent?: ReactNode;
  /* Mội dung delete của Popover */
  deleteContent?: ReactNode;
  /* Mội dung download của Popover */
  downloadContent?: ReactNode;
  /* Sự kiện onEdit của Popover */
  onEdit?: FunctionType;
  /* Sự kiện onDelete của Popover */
  onDelete?: FunctionType;
  /* Sự kiện onDownload của Popover */
  onDownload?: FunctionType;
  /* Sự kiện onEditTitle của Popover */
  onEditTitle?: FunctionType;
}

const PopoverContent: FC<PopoverContentProps> = ({
  deleteContent = 'Delete',
  downloadContent = 'Download Subscribers',
  editContent = 'Edit',
  editTitle = 'Edit title',
  onDelete,
  onEdit,
  onDownload,
  onEditTitle,
}) => {
  return (
    <View>
      <View
        color="gray6"
        colorHover="gray7"
        backgroundColor="light"
        backgroundColorHover="gray2"
        onClick={onEdit}
        css={{ padding: '8px 15px', cursor: 'pointer', fontWeight: 500, lineHeight: '21px' }}
      >
        {editContent}
      </View>
      <View
        color="gray6"
        colorHover="gray7"
        backgroundColor="light"
        backgroundColorHover="gray2"
        css={{ padding: '8px 15px', cursor: 'pointer', fontWeight: 500, lineHeight: '21px' }}
        onClick={onDelete}
      >
        {deleteContent}
      </View>
      <View
        color="gray6"
        colorHover="gray7"
        backgroundColor="light"
        backgroundColorHover="gray2"
        onClick={onDownload}
        css={{ padding: '8px 15px', cursor: 'pointer', fontWeight: 500, lineHeight: '21px' }}
      >
        {downloadContent}
      </View>
      <View
        color="gray6"
        colorHover="gray7"
        backgroundColor="light"
        backgroundColorHover="gray2"
        onClick={onEditTitle}
        css={{ padding: '8px 15px', cursor: 'pointer', fontWeight: 500, lineHeight: '21px' }}
      >
        {editTitle}
      </View>
    </View>
  );
};

export { PopoverContent };
