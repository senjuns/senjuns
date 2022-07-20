// import { FC } from 'react';
import styled from 'styled-components';
import { InterBoldMirage16px, Poppins22, Poppins26 } from '../../shared/fonts';
// import { useGetLatestPhotoFeedDataBySystemId } from './useListTeamCardData';
import { useScreenSize } from '../../hooks/useScreenSize';
// import { ResponsiveLayoutProps } from '../../shared/types';
import { useListTeamCardsQuery } from '../../lib/api';

const TeamCard = () => {
  const { isMobile } = useScreenSize();
  // const s = useGetLatestPhotoFeedDataBySystemId({});

  const { data, isLoading } = useListTeamCardsQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.listTeamCards?.items?.map((teamCard, index) => (
        <div key={index} className="container-center-horizontal">
          <div className="teamcard screen">
            <div className="w-full p-20 ml-40">
              <div className="">
                <DetailsDescriptionTitle>
                  {teamCard?.teamName}
                </DetailsDescriptionTitle>
                <div className="flex">
                  {teamCard?.tags?.map((tag, index) => (
                    <div
                      className="h-11 flex px-4 items-center bg-gallery rounded-full justify-center mr-10"
                      key={index}
                    >
                      <Text>{tag}</Text>
                    </div>
                  ))}
                </div>
                <DetailsDescriptionBody>
                  {teamCard?.teamDescription}
                </DetailsDescriptionBody>
              </div>
            </div>
            <div
              className={`flex flex-wrap items-center justify-between gap-30 ${
                isMobile ? 'pt-90 pr-20 pb-60' : ''
              }`}
            >
              {teamCard?.members?.map((member, index) => (
                <div className="flex flex-col items-center w-300" key={index}>
                  <Image src={member?.image} />
                  <MemberDescription>
                    <FirstName>{member?.firstName}</FirstName>
                    <Role>{member?.role}</Role>
                  </MemberDescription>
                </div>
              ))}
            </div>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;

const DetailsDescriptionTitle = styled.h1`
  ${Poppins26}
  min-height: 30px;
  font-weight: 400;
  color: var(--black);
  line-height: 30px;
  white-space: nowrap;
`;

const DetailsDescriptionBody = styled.div`
  ${Poppins22}
  margin-top: 40px;
  font-weight: 400;
  color: var(--black);
  line-height: 30px;
`;

const Text = styled.div`
  ${InterBoldMirage16px}
  min-height: 20px;
  text-align: center;
  letter-spacing: 0.64px;
  line-height: 20px;
  white-space: nowrap;
`;

const Image = styled.img`
  width: 200px;
  height: 201px;
`;

const MemberDescription = styled.div`
  ${Poppins22}
  height: 1px;
  margin-top: 40px;
  display: flex;
  padding: 0 72.5px;
  align-items: flex-end;
  justify-content: center;
`;

const FirstName = styled.div`
  min-height: 30px;
  margin-bottom: -29px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;

const Role = styled.div`
  min-height: 30px;
  margin-left: 5px;
  margin-bottom: -29px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;
