// import { FC } from 'react';
import styled from 'styled-components';
import { Poppins22, Poppins26 } from '../../shared/fonts';
// import { useGetLatestPhotoFeedDataBySystemId } from './useListTeamCardData';
import AddIcon from '@mui/icons-material/Add';
import { Chip, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useScreenSize } from '../../hooks/useScreenSize';
import {
  useCreateTeamCardMutation,
  // useDeleteTeamCardMutation,
  useListTeamCardsQuery,
  useUpdateTeamCardMutation,
} from '../../lib/api';
import { ScreenSize } from '../../shared/constants';
import { ResponsiveLayoutProps } from '../../shared/types';

const TeamCard = () => {
  const [isEditingIndex, setIsEditingIndex] = useState(-1);
  const [isAddingTeamCard, setIsAddingTeamCard] = useState(false);
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

  const updateMutation = useUpdateTeamCardMutation();
  const createMutation = useCreateTeamCardMutation();
  // const deleteMutation = useDeleteTeamCardMutation();

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
    setIsAddingTeamCard(false);
  };

  const handleClickSave = async (index: number) => {
    // console.log('save ' + JSON.stringify(editTeamCard));

    isAddingTeamCard
      ? await createMutation.mutateAsync({
          input: {
            id: data?.listTeamCards?.items?.[index]?.id || '-1',
            teamName: editTeamCard.teamName ?? '',
            teamDescription: editTeamCard.teamDescription ?? '',
            members: editTeamCard.members,
          },
        })
      : await updateMutation.mutateAsync({
          input: {
            id: data?.listTeamCards?.items?.[index]?.id || '-1',
            teamName: editTeamCard.teamName,
            teamDescription: editTeamCard.teamDescription,
            members: editTeamCard.members,
          },
        });
    setIsEditingIndex(-1);
    setIsAddingTeamCard(false);
    refetch();
  };

  const handleClickDelete = async (_index: number) => {
    // console.log('save ' + JSON.stringify(editTeamCard));

    // await deleteMutation.mutateAsync({
    //   input: {
    //     id: data?.listTeamCards?.items?.[index]?.id || '-1',
    //   },
    // });

    setIsEditingIndex(-1);
    setIsAddingTeamCard(false);
    refetch();
  };

  return (
    <Container>
      {(isAddingTeamCard
        ? [
            ...(data?.listTeamCards?.items ?? []),
            { id: 0, teamName: '', teamDescription: '', tags: [], members: [] },
          ]
        : data?.listTeamCards?.items
      )?.map((teamCard, teamCardIndex) => (
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
                      <Button
                        variant="contained"
                        onClick={() => handleClickSave(teamCardIndex)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleClickEdit(-1);
                          setIsAddingTeamCard(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </EditSaveCancelWrapper>
                  ) : (
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => handleClickEdit(teamCardIndex)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleClickDelete(teamCardIndex);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </TeamNameEditWrapper>
              </DetailsDescriptionTeamNameWrapper>
            </DetailsDescription>
          </Details>

          <Members isMobile={isMobile}>
            {(teamCardIndex === isEditingIndex
              ? editTeamCard.members
              : teamCard?.members
            )?.map((member, index) => (
              <Member key={member?.firstName}>
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
                    <Button
                      variant="contained"
                      onClick={() => {
                        const newMembers = (editTeamCard.members ?? []).filter(
                          (item) => item.firstName !== member?.firstName,
                        );
                        console.log(`newMembers=${JSON.stringify(newMembers)}`);
                        setEditTeamCard({
                          ...editTeamCard,
                          members: newMembers,
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </MemberDescription>
                ) : (
                  <MemberDescription>
                    <Typography variant="body1">{member?.firstName}</Typography>
                    <Typography variant="body1">{member?.role}</Typography>
                  </MemberDescription>
                )}
              </Member>
            ))}
            {teamCardIndex === isEditingIndex ? (
              <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                  setEditTeamCard({
                    ...editTeamCard,
                    members: [
                      ...(editTeamCard.members ?? []),
                      {
                        firstName: '',
                        role: '',
                        image:
                          'https://i.pravatar.cc/30' +
                            editTeamCard.members?.length ?? '0',
                      },
                    ],
                  });
                }}
              >
                <AddIcon />
              </Fab>
            ) : (
              ''
            )}
          </Members>
        </TeamCardStyle>
      ))}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          setIsAddingTeamCard(true);
          setEditTeamCard({});
          setIsEditingIndex(data?.listTeamCards?.items?.length ?? -1);
        }}
      >
        <AddIcon />
      </Fab>
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
  align-items: center;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  height: 551px;
  width: 100%;

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
