import TokenIcon from '@mui/icons-material/Token';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DatasetIcon from '@mui/icons-material/Dataset';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import GrassRoundedIcon from '@mui/icons-material/GrassRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import TranslateIcon from '@mui/icons-material/Translate';
import MicIcon from '@mui/icons-material/Mic';
import StorageIcon from '@mui/icons-material/Storage';
import HubIcon from '@mui/icons-material/Hub';
import LanguageIcon from '@mui/icons-material/Language';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupsIcon from '@mui/icons-material/Groups';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';

/**
 * ICON REGISTRY
 * Content is stored as plain data, so icons are referenced by name.
 * Add an entry here to make a new icon selectable in the admin.
 */
export const ICONS = {
  Token: TokenIcon,
  Psychology: PsychologyIcon,
  RecordVoiceOver: RecordVoiceOverIcon,
  Dataset: DatasetIcon,
  School: SchoolRoundedIcon,
  AccountBalance: AccountBalanceRoundedIcon,
  LocalHospital: LocalHospitalRoundedIcon,
  Grass: GrassRoundedIcon,
  Bolt: BoltRoundedIcon,
  Science: ScienceRoundedIcon,
  Translate: TranslateIcon,
  Mic: MicIcon,
  Storage: StorageIcon,
  Hub: HubIcon,
  Language: LanguageIcon,
  AutoAwesome: AutoAwesomeIcon,
  BusinessCenter: BusinessCenterIcon,
  Groups: GroupsIcon,
  Code: CodeIcon,
  MenuBook: MenuBookIcon,
};

export const ICON_OPTIONS = Object.keys(ICONS).map((k) => ({ value: k, label: k }));

export function getIcon(name) {
  return ICONS[name] || HubIcon;
}
