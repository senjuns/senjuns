import { FC, SVGProps } from 'react';
import { ReactComponent as BusinessCEOImg } from '../../assets/svgs/business-ceo-analyzing-business-growth-graph.svg';
import { ReactComponent as BusinessEntrepreneurImg } from '../../assets/svgs/business-entrepreneur-make-strategy-for-product-and-funding.svg';
import { ReactComponent as BusinessLadyImg } from '../../assets/svgs/business-lady-do-multi-tasking.svg';
import { ReactComponent as ChartIcon } from '../../assets/svgs/chart.svg';
import { ReactComponent as CheckIcon } from '../../assets/svgs/check.svg';
import { ReactComponent as ConceptAboutProblemSolvingImg } from '../../assets/svgs/concept-about-problem-solution-by-business-manager.svg';
import { ReactComponent as GrowIcon } from '../../assets/svgs/grow.svg';
import { ReactComponent as SymbolIcon } from '../../assets/svgs/symbols.svg';
import { ReactComponent as TogetherIco } from '../../assets/svgs/together.svg';
import localization from '../../localization';

export type TBenefit = {
  Icon: FC;
  title: string;
  content: string;
};

export const BENEFITS: TBenefit[] = [
  {
    Icon: TogetherIco,
    title: localization['landing.benefits.card.together.title'],
    content: localization['landing.benefits.card.together.content'],
  },
  {
    Icon: ChartIcon,
    title: localization['landing.benefits.card.learning.title'],
    content: localization['landing.benefits.card.learning.content'],
  },
  {
    Icon: CheckIcon,
    title: localization['landing.benefits.card.fair.title'],
    content: localization['landing.benefits.card.fair.content'],
  },
  {
    Icon: GrowIcon,
    title: localization['landing.benefits.card.grow.title'],
    content: localization['landing.benefits.card.grow.content'],
  },
  {
    Icon: SymbolIcon,
    title: localization['landing.benefits.card.simple.title'],
    content: localization['landing.benefits.card.simple.content'],
  },
];

export type TUniqueValue = {
  title: string;
  content: string;
  Image: FC<SVGProps<SVGSVGElement>>;
};

export const UNIQUE_VALUES: TUniqueValue[] = [
  {
    title: 'Novel & reliable',
    content:
      // eslint-disable-next-line max-len
      'We are bringing a completely novel, fully automated robotic platform to the market which will be operating reliably 24/7, 365 days of the year and is paired with our strong commitment to a world class customer service experience.',
    Image: BusinessLadyImg,
  },
  {
    title: 'Data driven & intuitive',
    content:
      // eslint-disable-next-line max-len
      'Our technology exceeds the capabilities of the human eye or any static sensor, generating millions of data points every day and translating these into simple and actionable insights, bringing the latest advances in machine learning and agronomy to your fingertips.',
    Image: BusinessCEOImg,
  },
  {
    title: 'Problem solving',
    content:
      // eslint-disable-next-line max-len
      'We develop all of our technology with a single objective in mind: to solve major pain points and develop tenable solutions to real problems in cultivation.',
    Image: ConceptAboutProblemSolvingImg,
  },
  {
    title: 'Turnkey solution',
    content:
      // eslint-disable-next-line max-len
      'Our flexible and modular platform is designed to be easily retrofitted into existing cultivation and greenhouse environments.',
    Image: BusinessEntrepreneurImg,
  },
];
