import { useScreenSize } from '../../hooks/useScreenSize';
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
            <div className="ml-40 w-full p-20">
              <div className="">
                <div className="text-3xl">{teamCard?.teamName}</div>
                <div className="flex">
                  {teamCard?.tags?.map((tag, index) => (
                    <div
                      className="bg-gallery mr-10 flex h-11 items-center rounded-full px-4"
                      key={index}
                    >
                      <div className="font-bold">{tag}</div>
                    </div>
                  ))}
                </div>
                <div className="text-2xl">{teamCard?.teamDescription}</div>
              </div>
            </div>
            <div
              className={`flex flex-wrap ${
                isMobile ? 'pt-90 pr-20 pb-60' : ''
              }`}
            >
              {teamCard?.members?.map((member, index) => (
                <div className="w-300 flex flex-col items-center" key={index}>
                  <img className="h-52 w-52" src={member?.image} />
                  <div className="mt-10 flex px-20 text-2xl">
                    <div className="pr-1">{member?.firstName}</div>
                    <div className="">{member?.role}</div>
                  </div>
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
