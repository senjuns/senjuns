// import { FC } from 'react';
import styled from 'styled-components';
import { InterBoldMirage16px, Poppins22, Poppins26 } from '../../shared/fonts';
// import { useGetLatestPhotoFeedDataBySystemId } from './useListTeamCardData';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ResponsiveLayoutProps } from '../../shared/types';
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
            <Details>
              <DetailsDescription>
                <DetailsDescriptionTitle>
                  {teamCard?.teamName}
                </DetailsDescriptionTitle>
                <Tags>
                  {teamCard?.tags?.map((tag, index) => (
                    <Tag key={index}>
                      <Text>{tag}</Text>
                    </Tag>
                  ))}
                </Tags>
                <DetailsDescriptionBody>
                  {teamCard?.teamDescription}
                </DetailsDescriptionBody>
              </DetailsDescription>
            </Details>
            <Members isMobile={isMobile}>
              {teamCard?.members?.map((member, index) => (
                <Member key={index}>
                  <Image src={member?.image} />
                  <MemberDescription>
                    <FirstName>{member?.firstName}</FirstName>
                    <Role>{member?.role}</Role>
                  </MemberDescription>
                </Member>
              ))}
            </Members>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;

const Details = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  margin-left: 40px;
`;

const DetailsDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const Tags = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Text = styled.div`
  ${InterBoldMirage16px}
  min-height: 20px;
  text-align: center;
  letter-spacing: 0.64px;
  line-height: 20px;
  white-space: nowrap;
`;

const Tag = styled.div`
  height: 44px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  background-color: var(--gallery);
  border-radius: 99px;
  justify-content: center;
  margin-right: 38px;
`;

const Members = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: center;
  padding: ${({ isMobile }) => (isMobile ? '90px 20px 60px' : '')};
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;

const Member = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
