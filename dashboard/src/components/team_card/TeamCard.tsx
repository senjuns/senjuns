import { FC } from 'react';
import styled from 'styled-components';
import { InterBoldMirage16px, Poppins22, Poppins26 } from '../../shared/fonts';

interface TeamCardProps {
  teamcarddetailsdescriptiontitle: string;
  teamcarddetailsdescriptionbody: string;
  badge1Text: string;
  badge2Text: string;
  badge3Text: string;
  teamcardmember1Image: string;
  teamcardmember1Descriptionfirstname: string;
  teamcardmember1Descriptionrole: string;
  teamcardmember2Image: string;
  teamcardmember2Descriptionfirstname: string;
  teamcardmember2Descriptionrole: string;
}

const TeamCard: FC<TeamCardProps> = ({
  teamcarddetailsdescriptiontitle,
  teamcarddetailsdescriptionbody,
  badge1Text,
  badge2Text,
  badge3Text,
  teamcardmember1Image,
  teamcardmember1Descriptionfirstname,
  teamcardmember1Descriptionrole,
  teamcardmember2Image,
  teamcardmember2Descriptionfirstname,
  teamcardmember2Descriptionrole,
}) => {
  return (
    <div className="container-center-horizontal">
      <div className="teamcard screen">
        <TeamCardDetails>
          <TeamCardDetailsDescription>
            <TeamCardDetailsDescriptionTitle>
              {teamcarddetailsdescriptiontitle}
            </TeamCardDetailsDescriptionTitle>
            <TeamCardDetailsDescriptionBody>
              {teamcarddetailsdescriptionbody}
            </TeamCardDetailsDescriptionBody>
          </TeamCardDetailsDescription>
          <TeamCardDetailsTags>
            <Badge1>
              <Badge1Text>{badge1Text}</Badge1Text>
            </Badge1>
            <Badge2>
              <Badge2Text>{badge2Text}</Badge2Text>
            </Badge2>
            <Badge3>
              <Badge3Text>{badge3Text}</Badge3Text>
            </Badge3>
          </TeamCardDetailsTags>
        </TeamCardDetails>
        <TeamCardMembers>
          <TeamCardMember1>
            <TeamCardMember1Image src={teamcardmember1Image} />
            <TeamCardMember1Description>
              <TeamCardMember1DescriptionFirstName>
                {teamcardmember1Descriptionfirstname}
              </TeamCardMember1DescriptionFirstName>
              <TeamCardMember1DescriptionRole>
                {teamcardmember1Descriptionrole}
              </TeamCardMember1DescriptionRole>
            </TeamCardMember1Description>
          </TeamCardMember1>
          <TeamCardMember1>
            <TeamCardMember2Image src={teamcardmember2Image} />
            <TeamCardMember2Description>
              <TeamCardMember2DescriptionFirstName>
                {teamcardmember2Descriptionfirstname}
              </TeamCardMember2DescriptionFirstName>
              <TeamCardMember2DescriptionRole>
                {teamcardmember2Descriptionrole}
              </TeamCardMember2DescriptionRole>
            </TeamCardMember2Description>
          </TeamCardMember1>
        </TeamCardMembers>
      </div>
    </div>
  );
};

export default TeamCard;

const TeamCardDetails = styled.div`
  height: 190px;
  display: flex;
  align-items: flex-start;
  min-width: 960px;
`;

const TeamCardDetailsDescription = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 190px;
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
  width: 460px;
  min-height: 120px;
  margin-top: 40px;
  font-weight: 400;
  color: var(--black);
  line-height: 30px;
`;

const TeamCardDetailsTags = styled.div`
  margin-left: 40px;
  display: flex;
  padding: 0 75px;
  align-items: flex-start;
  min-width: 460px;
`;

const Badge1Text = styled.div`
  ${InterBoldMirage16px}
  min-height: 20px;
  min-width: 40px;
  text-align: center;
  letter-spacing: 0.64px;
  line-height: 20px;
  white-space: nowrap;
`;

const Badge1 = styled.div`
  height: 44px;
  margin-left: 40px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  min-width: 60px;
  background-color: var(--gallery);
  border-radius: 99px;
  justify-content: center;
`;

const Badge2Text = styled.div`
  ${InterBoldMirage16px}
  min-height: 20px;
  min-width: 28px;
  text-align: center;
  letter-spacing: 0.64px;
  line-height: 20px;
  white-space: nowrap;
`;

const Badge2 = styled.div`
  height: 44px;
  margin-left: 40px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  min-width: 98px;
  background-color: var(--gallery);
  border-radius: 99px;
  justify-content: center;
`;

const Badge3Text = styled.div`
  ${InterBoldMirage16px}
  min-height: 20px;
  min-width: 66px;
  text-align: center;
  letter-spacing: 0.64px;
  line-height: 20px;
  white-space: nowrap;
`;

const Badge3 = styled.div`
  height: 44px;
  margin-left: 40px;
  display: flex;
  padding: 0 16px;
  align-items: center;
  min-width: 98px;
  background-color: var(--gallery);
  border-radius: 99px;
  justify-content: center;
`;

const TeamCardMembers = styled.div`
  height: 241px;
  margin-top: 40px;
  display: flex;
  align-items: flex-start;
  min-width: 960px;
`;

const TeamCardMember1 = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 241px;
`;

const TeamCardMember1Image = styled.img`
  width: 200px;
  height: 201px;
`;

const TeamCardMember1Description = styled.div`
  ${Poppins22}
  height: 1px;
  margin-top: 40px;
  display: flex;
  padding: 0 72.5px;
  align-items: flex-end;
  min-width: 480px;
  justify-content: center;
`;

const TeamCardMember1DescriptionFirstName = styled.div`
  min-height: 30px;
  margin-bottom: -29px;
  min-width: 51px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;

const TeamCardMember1DescriptionRole = styled.div`
  min-height: 30px;
  margin-left: 5px;
  margin-bottom: -29px;
  min-width: 279px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;

const TeamCardMember2Image = styled.img`
  width: 197px;
  height: 198px;
`;

const TeamCardMember2Description = styled.div`
  ${Poppins22}
  height: 3px;
  margin-top: 40px;
  display: flex;
  padding: 0 67.5px;
  align-items: flex-end;
  min-width: 480px;
  justify-content: center;
`;

const TeamCardMember2DescriptionFirstName = styled.div`
  min-height: 30px;
  margin-bottom: -27px;
  min-width: 62px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;

const TeamCardMember2DescriptionRole = styled.div`
  min-height: 30px;
  margin-left: 5px;
  margin-bottom: -27px;
  min-width: 278px;
  font-weight: 400;
  color: var(--black);
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
`;
