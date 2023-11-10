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

  min-height: 104px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 70px;
  }
`;
export const PostHead = styled.div`
  display:flex;
  justify-content: space-between;

  & > img {
    margin-top: 8px;
  }
`;

export const PostTitle = styled.div`
& > span {
    font-size: 21px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 표시할 최대 줄 수 */
    -webkit-box-orient: vertical;
    color: #000000;
    text-overflow: ellipsis;  
    overflow: hidden;            
    max-width: 455px;
    max-height: 60px;
  }
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

  & > span {
    text-overflow: ellipsis;  
    white-space: nowrap;
    overflow: hidden;            
    max-width: 170px;
    max-height: 100px;
  }

  @media (max-width: 560px){
    span {
      max-width: 80px;
    }
  }
`;
export const PostDate = styled.div`
  color: #6D6D6D;
  font-size: 13px;
`;