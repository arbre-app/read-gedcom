import { ValueAdoption } from './ValueAdoption';
import { ValueAge } from './ValueAge';
import { ValueCertainty } from './ValueCertainty';
import { ValueCharacterEncoding } from './ValueCharacterEncoding';
import { ValueEvent } from './ValueEvent';
import { ValueGedcomForm } from './ValueGedcomForm';
import { ValueLanguage } from './ValueLanguage';
import { ValueMediaType } from './ValueMediaType';
import { ValueMultimediaFormat } from './ValueMultimediaFormat';
import { ValueNameType } from './ValueNameType';
import { ValuePedigreeLinkageType } from './ValuePedigreeLinkageType';
import { ValuePhonetizationMethod } from './ValuePhonetizationMethod';
import { ValueRole } from './ValueRole';
import { ValueRomanizationMethod } from './ValueRomanizationMethod';
import { ValueSex } from './ValueSex';
import { ValueSourceCertainty } from './ValueSourceCertainty';

export namespace GedcomValue {
    export import Adoption = ValueAdoption;
    export import Certainty = ValueCertainty;
    export import CharacterEncoding = ValueCharacterEncoding;
    export import Event = ValueEvent;
    export import GedcomForm = ValueGedcomForm;
    export import Language = ValueLanguage;
    export import MediaType = ValueMediaType;
    export import MultimediaFormat = ValueMultimediaFormat;
    export import NameType = ValueNameType;
    export import PedigreeLinkageType = ValuePedigreeLinkageType;
    export import PhonetizationMethod = ValuePhonetizationMethod;
    export import Role = ValueRole;
    export import RomanizationMethod = ValueRomanizationMethod;
    export import Sex = ValueSex;
    export import SourceCertainty = ValueSourceCertainty;

    export type Age = ValueAge;
}
