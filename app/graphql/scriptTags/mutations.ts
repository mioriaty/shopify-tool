import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

interface WriteScriptTag {
  userErrors: {
    field: any;
    message: any;
  };
  scriptTag: {
    src: any;
    displayScope: any;
  };
}

interface WriteScripTagVars {
  input: {
    src: string;
    displayScope: 'ALL' | 'ONLINE_STORE' | 'ORDER_STATUS';
  };
}

const WRITE_SCRIPTTAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      userErrors {
        field
        message
      }
      scriptTag {
        src
        displayScope
        id
      }
    }
  }
`;

export const useWriteScriptTag = () => {
  const [writeScriptTag, { data, loading, error }] = useMutation<WriteScriptTag, WriteScripTagVars>(WRITE_SCRIPTTAG);

  const handleWriteScripTags = ({ src }: { src: string }) => {
    // Đoạn này cần lưu lên server để check xem script đã được thêm vào trang store chưa
    // Ví dụ thử với localstorage
    if (localStorage.getItem('wiloke:scripttag')) {
      return;
    }
    localStorage.setItem('wiloke:scripttag', src);
    return writeScriptTag({ variables: { input: { src, displayScope: 'ONLINE_STORE' } } });
  };

  return {
    writeScriptTag: handleWriteScripTags,
    data,
    loading,
    error,
  };
};
