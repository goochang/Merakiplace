import styled from "styled-components";

export const BodyStyle = styled.div`
  background-color: #F0F1F4;
  padding: 20px;
  min-height: calc(100vh - 60px); 
  border-top: 1px solid #C4C4C4;
`;

export const PostStyle = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: 10px 20px;
`;
export const PostTitle = styled.div`
  font-size: 21px;
  color: #000000;
`;
export const PostSub = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const PostInfo = styled.div`
  color: #495057;
  display:flex;
  font-size: 13px;
  gap: 8px;
`;
export const PostDate = styled.div`
  color: #6D6D6D;
  font-size: 13px;
`;