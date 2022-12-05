import { useAtom, useAtomValue } from 'jotai';
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';

import { isMyInfoSideBarOpenAtom } from '../../atom/myInfoSideBar';
import Modal from '../Modal/Modal';
import { Z_INDEX, POPULATION_LEVEL_COLOR } from '../../config/constants';
import { userInfoAtom } from '../../atom/userInfo';
import { allAreasInfoAtom } from '../../atom/areasInfo';
import { SortAllAreasTypes } from '../../types/interfaces';
import apis from '../../apis/apis';

const SideBarLayout = css`
  z-index: ${Z_INDEX.MODAL};
  background-color: white;
  display: block;
  width: 60%;
  max-width: 500px;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
`;

const HeaderComponent = styled.div`
  h2 {
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 800;
    line-height: 1.5;
  }

  h2:first-child {
    font-size: 1rem;
  }

  h2:last-child {
    font-size: 1.3rem;
    margin-top: 5px;

    span {
      color: #6349ff;
      font-size: 1.7rem;
    }
  }
`;

const BookmarkListComponent = styled.div`
  margin-top: 50px;
  width: 100%;

  h2 {
    color: #6349ff;
    font-size: 1rem;
  }

  hr {
    width: 100%;
    border: 1px solid #6349ff;
  }
`;

interface PopulationLevelProps {
  populationLevel: string;
}

const BookmarkItemComponent = styled.div<PopulationLevelProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: 15px;

  > div:first-child {
    width: 85%;
    display: flex;
    align-items: center;
  }

  > div:last-child {
    width: 15%;
    cursor: pointer;
    font-size: 0.7rem;
    color: #979797;
    text-align: right;
  }

  .population-level {
    width: 15px;
    height: 15px;
    margin: 0;
    background: ${props => POPULATION_LEVEL_COLOR[props.populationLevel].fill};
    border: 1px solid
      ${props => POPULATION_LEVEL_COLOR[props.populationLevel].stroke};
    border-radius: 10px;
    margin-right: 10px;
  }

  .area-name {
    width: 85%;
    font-weight: 800;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const MyInfoSideBar = () => {
  const [isMyInfoSideBarOpen] = useAtom(isMyInfoSideBarOpenAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const areas = useAtomValue(allAreasInfoAtom);
  const [myBookmarks, setMyBookmarks] = useState<SortAllAreasTypes[] | null>(
    null
  );

  // 전체 장소에서 북마크에 등록된 정보만 가져옴
  const makeBookmarks = () => {
    setMyBookmarks(areas.filter(area => userInfo?.bookmarks.includes(area[0])));
  };

  // 사이드바에서 북마크 삭제
  const onClickDelete = async (areaName: string) => {
    if (!userInfo || !userInfo) {
      return;
    }

    const { _id: userId, bookmarks } = userInfo;

    await apis.deleteBookmark(areaName, userId);
    setUserInfo({
      ...userInfo,
      bookmarks: bookmarks.filter(bookmark => bookmark !== areaName)
    });
  };

  useEffect(() => {
    if (!userInfo || !areas) {
      return;
    }

    makeBookmarks();
  }, [userInfo, areas]);

  return (
    <Modal
      isOpen={isMyInfoSideBarOpen}
      background={true}
      customModalStyle={SideBarLayout}>
      <HeaderComponent>
        <h2>안녕하세요</h2>
        <h2>
          <span>{userInfo?.nickname}</span>님 😌
        </h2>
      </HeaderComponent>
      <BookmarkListComponent>
        <h2>북마크</h2>
        <hr />
        {myBookmarks &&
          myBookmarks.map((bookmark, idx) => (
            <BookmarkItemComponent
              key={idx}
              populationLevel={bookmark[1].populationLevel}>
              <div>
                <div className='population-level' />
                <span className='area-name'>{bookmark[0]}</span>
              </div>
              <div onClick={() => onClickDelete(bookmark[0])}>삭제</div>
            </BookmarkItemComponent>
          ))}
      </BookmarkListComponent>
    </Modal>
  );
};

export default MyInfoSideBar;
