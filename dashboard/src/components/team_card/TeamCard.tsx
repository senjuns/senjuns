// import { FC } from 'react';
import styled from 'styled-components';
import { Poppins22, Poppins26 } from '../../shared/fonts';
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
import { TextField, Chip } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

const TeamCard = () => {
  const [isEditingIndex, setIsEditingIndex] = useState(-1);
  const [editTeamCard, setEditTeamCard] = useState<{
    teamName?: string;
    teamDescription?: string;
    members?: { firstName?: string; image?: string; role?: string }[];
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
    setEditTeamCard({
      members: data?.listTeamCards?.items?.[index]?.members?.map((member) => ({
        firstName: member?.firstName ?? undefined,
        image: member?.image ?? undefined,
        role: member?.role ?? undefined,
      })),
    });
  };

  const handleClickSave = async (index: number) => {
    console.log('save ' + JSON.stringify(editTeamCard));
    await mutation.mutateAsync({
      input: {
        id: data?.listTeamCards?.items?.[index]?.id || '-1',
        teamName: editTeamCard.teamName,
        teamDescription: editTeamCard.teamDescription,
        members: editTeamCard.members,
      },
    });
    setIsEditingIndex(-1);
    refetch();
  };

  return (
    <Container>
      {data?.listTeamCards?.items?.map((teamCard, teamCardIndex) => (
        // <div key={teamCardIndex} className="container-center-horizontal">
        <TeamCardStyle>
          <Details>
            <DetailsDescription>
              <DetailsDescriptionTeamNameWrapper>
                {teamCardIndex === isEditingIndex ? (
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
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={teamCard?.tags?.map((tag) => tag ?? '') ?? []}
                      // options={["a", "b", "c"]}
                      getOptionLabel={(option) => option}
                      defaultValue={[teamCard?.tags?.[0] ?? '']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          placeholder="Category"
                        />
                      )}
                    />
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
                    <Typography variant="h3" gutterBottom component="div">
                      {teamCard?.teamName}
                    </Typography>
                    <Tags>
                      {teamCard?.tags?.map((tag) => (
                        <Chip label={tag} />
                      ))}
                    </Tags>
                    <Typography pt={'16px'} variant="body1">
                      {teamCard?.teamDescription}
                    </Typography>
                  </div>
                )}
                <TeamNameEditWrapper>
                  {teamCardIndex === isEditingIndex ? (
                    <EditSaveCancelWrapper>
                      <Button onClick={() => handleClickSave(teamCardIndex)}>
                        Save
                      </Button>
                      <Button onClick={() => handleClickEdit(-1)}>
                        Cancel
                      </Button>
                    </EditSaveCancelWrapper>
                  ) : (
                    <Button onClick={() => handleClickEdit(teamCardIndex)}>
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
                <Image src={member?.image ?? '/ms-icon-70x70.png'} />
                {teamCardIndex === isEditingIndex ? (
                  <MemberDescription>
                    <TextField
                      // fullWidth
                      defaultValue={member?.firstName}
                      onChange={(e) => {
                        editTeamCard.members![index].firstName = e.target.value;
                        setEditTeamCard({
                          ...editTeamCard,
                        });
                      }}
                    />
                    <TextField
                      fullWidth
                      defaultValue={member?.role}
                      onChange={(e) => {
                        editTeamCard.members![index].role = e.target.value;
                        setEditTeamCard({
                          ...editTeamCard,
                        });
                      }}
                    />
                  </MemberDescription>
                ) : (
                  <MemberDescription>
                    <Typography variant="body1">{member?.firstName}</Typography>
                    <Typography variant="body1">{member?.role}</Typography>
                  </MemberDescription>
                )}
              </Member>
            ))}
          </Members>
        </TeamCardStyle>
        // </div>
      ))}
    </Container>
  );
};

export default TeamCard;

const TeamCardStyle = styled.div`
  align-items: center;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  height: 551px;
  width: 100%;
`;

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

const EditDetailsDescriptionBody = styled(TextField)`
  input {
    ${Poppins22}
    margin-top: 40px;
    font-weight: 400;
    line-height: 30px;
  }
`;

const Members = styled.div<ResponsiveLayoutProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: ${({ isMobile }) => (isMobile ? '90px 20px 60px' : '')};
  gap: 30px;
  flex-wrap: wrap;*/
  justify-content: space-evenly;
  width: 100%;
`;

const Member = styled.div`
  /* width: 300px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
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
