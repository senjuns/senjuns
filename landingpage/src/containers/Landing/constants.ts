import { FC, SVGProps } from 'react';
import { ReactComponent as LeafIcon } from 'assets/svgs/leaf.svg';
import { ReactComponent as ChartIcon } from 'assets/svgs/chart.svg';
import { ReactComponent as CheckIcon } from 'assets/svgs/check.svg';
import { ReactComponent as EyeIcon } from 'assets/svgs/eye.svg';
import { ReactComponent as DetectIcon } from 'assets/svgs/detect.svg';
import { ReactComponent as BusinessLadyImg } from 'assets/svgs/business-lady-do-multi-tasking.svg';
import { ReactComponent as BusinessCEOImg } from 'assets/svgs/business-ceo-analyzing-business-growth-graph.svg';
import { ReactComponent as ConceptAboutProblemSolvingImg } from 'assets/svgs/concept-about-problem-solution-by-business-manager.svg';
import { ReactComponent as BusinessEntrepreneurImg } from 'assets/svgs/business-entrepreneur-make-strategy-for-product-and-funding.svg';

export type TBenefit = {
  Icon: FC;
  title: string;
  content: string;
};

export const BENEFITS: TBenefit[] = [
  {
    Icon: LeafIcon,
    title: 'Monitor and optimize every individual plant',
    content:
      'Neatleaf is creating the first system in the industry that enables you to remotely monitor and optimize the growth and environment of each individual plant in the cultivation space.',
  },
  {
    Icon: ChartIcon,
    title: 'Increase profitability by creating more with less',
    content:
      // eslint-disable-next-line max-len
      'We are building a technology that is capable of detecting the subtle ways a plant responds to its environment and model what input factors create which outcome, so that you can optimize profits by creating optimal plant growth with fewer resources.',
  },
  {
    Icon: CheckIcon,
    title: 'Consistent quality with every run',
    content:
      // eslint-disable-next-line max-len
      'Neatleaf’s technology helps you identify existing inconsistencies and microclimates within the cultivation environment, empowering you to streamline each growth cycle and generate a consistently high-quality product every single time.',
  },
  {
    Icon: EyeIcon,
    title: 'Remotely monitor plants anytime, anywhere',
    content:
      // eslint-disable-next-line max-len
      'Our powerful digital interfaces allow you to remotely evaluate your crop status anytime, anywhere and help you pinpoint any actionable issues. Automate your scouting and IPM activities while minimizing the risk of contamination within your cultivation space.',
  },
  {
    Icon: DetectIcon,
    title: 'Detect issues as early as they happen',
    content:
      // eslint-disable-next-line max-len
      'Our breakthrough technology automatically detects any abnormalities in your cultivation area, including nutrient deficiencies or pest problems, and subsequently alerts you, prompting you to take immediate action.',
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
