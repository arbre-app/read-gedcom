/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValueAdoption } from './ValueAdoption';
import { ValueCharacterEncoding } from './ValueCharacterEncoding';
import { ValueEvent } from './ValueEvent';
import { ValueGedcomForm } from './ValueGedcomForm';
import { ValueMediaType } from './ValueMediaType';
import { ValueMultimediaFormat } from './ValueMultimediaFormat';
import { ValueNameType } from './ValueNameType';
import { ValuePedigreeLinkageType } from './ValuePedigreeLinkageType';
import { ValuePhonetizationMethod } from './ValuePhonetizationMethod';
import { ValueRomanizationMethod } from './ValueRomanizationMethod';
import { ValueSex } from './ValueSex';
import { ValueSourceCertainty } from './ValueSourceCertainty';

export namespace GedcomValue {
    export import Adoption = ValueAdoption;
    export import CharacterEncoding = ValueCharacterEncoding;
    export import Event = ValueEvent;
    export import GedcomForm = ValueGedcomForm;
    export import MediaType = ValueMediaType;
    export import MultimediaFormat = ValueMultimediaFormat;
    export import NameType = ValueNameType;
    export import PedigreeLinkageType = ValuePedigreeLinkageType;
    export import PhonetizationMethod = ValuePhonetizationMethod;
    export import RomanizationMethod = ValueRomanizationMethod;
    export import Sex = ValueSex;
    export import SourceCertainty = ValueSourceCertainty;
}
