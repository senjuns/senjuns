// import { FC } from 'react';
import styled from 'styled-components';
import { InterBoldMirage16px, Poppins22, Poppins26 } from '../../shared/fonts';
import { useGetLatestPhotoFeedDataBySystemId } from './useListTeamCardData';
import { useScreenSize } from '../../hooks/useScreenSize';
import { ResponsiveLayoutProps } from '../../shared/types';

const TeamCard = () => {
  const { isMobile } = useScreenSize();
  const teamCards = useGetLatestPhotoFeedDataBySystemId({});

  return (
    <div>
      {teamCards.map((teamCard) => (
        <div className="container-center-horizontal">
          <div className="teamcard screen">
            <TeamCardDetails>
              <TeamCardDetailsDescription>
                <TeamCardDetailsDescriptionTitle>
                  {teamCard.teamName}
                </TeamCardDetailsDescriptionTitle>
                <TeamCardDetailsDescriptionBody>
                  {teamCard.teamDescription}
                </TeamCardDetailsDescriptionBody>
              </TeamCardDetailsDescription>
              <TeamCardDetailsTags>
                {teamCard.tags.map((tag) => (
                  <Badge>
                    <BadgeText>{tag}</BadgeText>
                  </Badge>
                ))}
              </TeamCardDetailsTags>
            </TeamCardDetails>
            <TeamCardMembers isMobile={isMobile}>
              {teamCard.members.map((member) => (
                <TeamCardMember>
                  <TeamCardMemberImage src={member.image} />
                  <TeamCardMemberDescription>
                    <TeamCardMemberDescriptionFirstName>
                      {member.firstName}
                    </TeamCardMemberDescriptionFirstName>
                    <TeamCardMemberDescriptionRole>
                      {member.role}
                    </TeamCardMemberDescriptionRole>
                  </TeamCardMemberDescription>
                </TeamCardMember>
              ))}
            </TeamCardMembers>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamCard;

const TeamCardDetails = styled.div`
  height: 190px;
  display: flex;
`;

const TeamCardDetailsDescription = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 190px;
  width: 50%;
`;

const TeamCardDetailsDescriptionTitle = styled.h1`
  ${Poppins26}
  min-height: 30px;
  font-weight: 400;
  color: var(--black);
  line-height: 30px;
  white-space: nowrap;
`;

const TeamCardDetailsDescriptionBody = styled.div`
  ${Poppins22}
  min-height: 120px;
  margin-top: 40px;
  font-weight: 400;
  color: var(--black);
  line-height: 30px;
`;

const TeamCardDetailsTags = styled.div`
  display: flex;
  align-items: flex-start;
  width: 50%;
  justify-content: space-evenly;
`;

const BadgeText = styled.div`
  ${InterBoldMirage16px}
  min-height: 20px;
  text-align: center;
  letter-spacing: 0.64px;
  line-height: 20px;
  white-space: nowrap;
`;

const Badge = styled.div`
  height: 44px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  background-color: var(--gallery);
  border-radius: 99px;
  justify-content: center;
`;

const TeamCardMembers = styled.div<ResponsiveLayoutProps>`
  display: flex;
  align-items: center;
  padding: ${({ isMobile }) => (isMobile ? '90px 20px 60px' : '120px 134px')};
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
`;

const TeamCardMember = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamCardMemberImage = styled.img`
  width: 200px;
  height: 201px;
`;

const TeamCardMemberDescription = styled.div`
  ${Poppins22}
  height: 1px;
  margin-top: 40px;
  display: flex;
  padding: 0 72.5px;
  align-items: flex-end;
  justify-content: center;
`;

const TeamCardMemberDescriptionFirstName = styled.div`
  min-height: 30px;
  margin-bottom: -29px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;

const TeamCardMemberDescriptionRole = styled.div`
  min-height: 30px;
  margin-left: 5px;
  margin-bottom: -29px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;
