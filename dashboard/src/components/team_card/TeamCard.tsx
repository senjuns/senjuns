// import { FC } from 'react';
import styled from 'styled-components';
import { InterBoldMirage16px, Poppins22, Poppins26 } from '../../shared/fonts';
// import { useGetLatestPhotoFeedDataBySystemId } from './useListTeamCardData';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ResponsiveLayoutProps } from '../../shared/types';
import {
  useListTeamCardsQuery,
  useUpdateTeamCardMutation,
} from '../../lib/api';
import { Button } from '../common';
import { ScreenSize } from '../../shared/constants';
import { useState } from 'react';
import { TextField } from '@material-ui/core';

const TeamCard = () => {
  const [isEditingIndex, setIsEditingIndex] = useState(-1);
  const [editTeamCard, setEditTeamCard] = useState<{
    teamName?: string;
    teamDescription?: string;
  }>({});

  const { isMobile } = useScreenSize();
  // const s = useGetLatestPhotoFeedDataBySystemId({});

  const { data, isLoading, refetch } = useListTeamCardsQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const mutation = useUpdateTeamCardMutation();

  if (isLoading) return <div>Loading...</div>;

  const handleClickEdit = async (index: number) => {
    setIsEditingIndex(index);
  };

  const handleClickSave = async (index: number) => {
    console.log('save ' + JSON.stringify(editTeamCard));
    await mutation.mutateAsync({
      input: {
        id: data?.listTeamCards?.items?.[index]?.id || '-1',
        teamName: editTeamCard.teamName,
        teamDescription: editTeamCard.teamDescription,
      },
    });
    setIsEditingIndex(-1);
    refetch();
  };

  return (
    <Container>
      {data?.listTeamCards?.items?.map((teamCard, index) => (
        <div key={index} className="container-center-horizontal">
          <div className="teamcard screen">
            <Details>
              <DetailsDescription>
                <DetailsDescriptionTeamNameWrapper>
                  {index === isEditingIndex ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <EditDetailsDescriptionTeamName
                        fullWidth
                        defaultValue={teamCard?.teamName}
                        onChange={(e) => {
                          setEditTeamCard({
                            ...editTeamCard,
                            teamName: e.target.value,
                          });
                        }}
                      />
                      <Tags>
                        {teamCard?.tags?.map((tag, index) => (
                          <Tag key={index}>
                            <Text>{tag}</Text>
                          </Tag>
                        ))}
                      </Tags>
                      <EditDetailsDescriptionBody
                        fullWidth
                        multiline
                        defaultValue={teamCard?.teamDescription}
                        onChange={(e) => {
                          setEditTeamCard({
                            ...editTeamCard,
                            teamDescription: e.target.value,
                          });
                        }}
                      />
                      {/* <DetailsDescriptionBody>
                        {teamCard?.teamDescription}
                      </DetailsDescriptionBody> */}
                    </div>
                  ) : (
                    <div>
                      <DetailsDescriptionTeamName>
                        {teamCard?.teamName}
                      </DetailsDescriptionTeamName>
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
                    </div>
                  )}
                  <TeamNameEditWrapper>
                    {index === isEditingIndex ? (
                      <EditSaveCancelWrapper>
                        <Button onClick={() => handleClickSave(index)}>
                          Save
                        </Button>
                        <Button onClick={() => handleClickEdit(-1)}>
                          Cancel
                        </Button>
                      </EditSaveCancelWrapper>
                    ) : (
                      <Button onClick={() => handleClickEdit(index)}>
                        Edit
                      </Button>
                    )}
                  </TeamNameEditWrapper>
                </DetailsDescriptionTeamNameWrapper>
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
        </div>
      ))}
    </Container>
  );
};

export default TeamCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${ScreenSize.xl}px) {
    padding-right: 32px;
  }

  @media only screen and (min-width: ${ScreenSize.md}px) {
    padding-right: 24px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-left: 40px;
  align-items: center;
`;

const DetailsDescription = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const DetailsDescriptionTeamNameWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
`;

const TeamNameEditWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-right: 40px;
  justify-content: flex-end;
`;

const EditSaveCancelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-right: 40px;
  justify-content: flex-end;
`;

const DetailsDescriptionTeamName = styled.h1`
  ${Poppins26}
  min-height: 30px;
  font-weight: 400;
  line-height: 30px;
  /* white-space: nowrap; */
`;

const EditDetailsDescriptionTeamName = styled(TextField)`
  input {
    ${Poppins26}
    min-height: 30px;
    font-weight: 400;
    line-height: 30px;
  }
  margin-bottom: 20px;
`;

const Tags = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DetailsDescriptionBody = styled.div`
  ${Poppins22}
  margin-top: 40px;
  font-weight: 400;
  line-height: 30px;
`;

const EditDetailsDescriptionBody = styled(TextField)`
  input {
    ${Poppins22}
    margin-top: 40px;
    font-weight: 400;
    line-height: 30px;
  }
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
