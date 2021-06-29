/* eslint-disable @typescript-eslint/no-unused-vars, import/export */
import { SelectionAddressStructure } from './SelectionAddressStructure';
import { SelectionAddress } from './SelectionAddress';
import { SelectionAdoption } from './SelectionAdoption';
import { SelectionAssociation } from './SelectionAssociation';
import { SelectionChanged } from './SelectionChanged';
import { SelectionCharacterEncoding } from './SelectionCharacterEncoding';
import { SelectionChildFamilyLink } from './SelectionChildFamilyLink';
import { SelectionCitationData } from './SelectionCitationData';
import { SelectionCitationEvent } from './SelectionCitationEvent';
import { SelectionCoordinates } from './SelectionCoordinates';
import { SelectionCorporation } from './SelectionCorporation';
import { SelectionDataSource } from './SelectionDataSource';
import { SelectionDateExact } from './SelectionDateExact';
import { SelectionDatePeriod } from './SelectionDatePeriod';
import { SelectionDatePunctual } from './SelectionDatePunctual';
import { SelectionDate } from './SelectionDate';
import { SelectionEventsRecorded } from './SelectionEventsRecorded';
import { SelectionEvent } from './SelectionEvent';
import { SelectionFamilyEvent } from './SelectionFamilyEvent';
import { SelectionFamilyRecord } from './SelectionFamilyRecord';
import { SelectionFamilyReferenceAdoption } from './SelectionFamilyReferenceAdoption';
import { SelectionFamilyReference } from './SelectionFamilyReference';
import { SelectionGedcomFile } from './SelectionGedcomFile';
import { SelectionGedcomForm } from './SelectionGedcomForm';
import { SelectionGedcomSource } from './SelectionGedcomSource';
import { SelectionGedcomVersion } from './SelectionGedcomVersion';
import { SelectionHeader } from './SelectionHeader';
import { SelectionIndividualAttribute } from './SelectionIndividualAttribute';
import { SelectionIndividualEventFamilyAdoption } from './SelectionIndividualEventFamilyAdoption';
import { SelectionIndividualEventFamily } from './SelectionIndividualEventFamily';
import { SelectionIndividualEvent } from './SelectionIndividualEvent';
import { SelectionIndividualRecord } from './SelectionIndividualRecord';
import { SelectionIndividualReference } from './SelectionIndividualReference';
import { SelectionMediaType } from './SelectionMediaType';
import { SelectionMetaEvent } from './SelectionMetaEvent';
import { SelectionMultimediaFile } from './SelectionMultimediaFile';
import { SelectionMultimediaFormat } from './SelectionMultimediaFormat';
import { SelectionMultimediaRecord } from './SelectionMultimediaRecord';
import { SelectionMultimediaReference } from './SelectionMultimediaReference';
import { SelectionNamePhonetization } from './SelectionNamePhonetization';
import { SelectionNamePieces } from './SelectionNamePieces';
import { SelectionNameRomanization } from './SelectionNameRomanization';
import { SelectionName } from './SelectionName';
import { SelectionNameType } from './SelectionNameType';
import { SelectionNoteRecord } from './SelectionNoteRecord';
import { SelectionNoteReferenceMixin } from './SelectionNoteReferenceMixin';
import { SelectionPedigreeLinkageType } from './SelectionPedigreeLinkageType';
import { SelectionPhonetizationMethod } from './SelectionPhonetizationMethod';
import { SelectionPhonetization } from './SelectionPhonetization';
import { SelectionPlace } from './SelectionPlace';
import { SelectionRecord } from './SelectionRecord';
import { SelectionReferenceNumber } from './SelectionReferenceNumber';
import { SelectionReference } from './SelectionReference';
import { SelectionRepositoryRecord } from './SelectionRepositoryRecord';
import { SelectionRepositoryReference } from './SelectionRepositoryReference';
import { SelectionRomanizationMethod } from './SelectionRomanizationMethod';
import { SelectionRomanization } from './SelectionRomanization';
import { SelectionSex } from './SelectionSex';
import { SelectionSourceCertainty } from './SelectionSourceCertainty';
import { SelectionSourceCitation } from './SelectionSourceCitation';
import { SelectionSourceData } from './SelectionSourceData';
import { SelectionSourceRecord } from './SelectionSourceRecord';
import { SelectionSpouseEventDetails } from './SelectionSpouseEventDetails';
import { SelectionSpouseFamilyLink } from './SelectionSpouseFamilyLink';
import { SelectionSubmitterRecord } from './SelectionSubmitterRecord';
import { SelectionSubmitterReference } from './SelectionSubmitterReference';
import { SelectionTime } from './SelectionTime';
import { SelectionAny, SelectionGedcom } from './Selection';
import { SelectionWithNoteMixin, SelectionWithSourceCitationMixin } from './mixin';
export { SelectionAny } from './Selection';
//import { Selection as SelectionBase } from './Selection';

namespace SelectionAny {}

namespace SelectionAddressStructure {}
namespace SelectionAddress {}
namespace SelectionAdoption {}
namespace SelectionAssociation {}
namespace SelectionChanged {}
namespace SelectionCharacterEncoding {}
namespace SelectionChildFamilyLink {}
namespace SelectionCitationData {}
namespace SelectionCitationEvent {}
namespace SelectionCoordinates {}
namespace SelectionCorporation {}
namespace SelectionDataSource {}
namespace SelectionDateExact {}
namespace SelectionDatePeriod {}
namespace SelectionDatePunctual {}
namespace SelectionDate {}
namespace SelectionEventsRecorded {}
namespace SelectionEvent {}
namespace SelectionFamilyEvent {}
namespace SelectionFamilyRecord {}
namespace SelectionFamilyReferenceAdoption {}
namespace SelectionFamilyReference {}
namespace SelectionGedcomFile {}
namespace SelectionGedcomForm {}
namespace SelectionGedcomSource {}
namespace SelectionGedcom {}
namespace SelectionGedcomVersion {}
namespace SelectionHeader {}
namespace SelectionIndividualAttribute {}
namespace SelectionIndividualEventFamilyAdoption {}
namespace SelectionIndividualEventFamily {}
namespace SelectionIndividualEvent {}
namespace SelectionIndividualRecord {}
namespace SelectionIndividualReference {}
namespace SelectionMediaType {}
namespace SelectionMetaEvent {}
namespace SelectionMultimediaFile {}
namespace SelectionMultimediaFormat {}
namespace SelectionMultimediaRecord {}
namespace SelectionMultimediaReference {}
namespace SelectionNamePhonetization {}
namespace SelectionNamePieces {}
namespace SelectionNameRomanization {}
namespace SelectionName {}
namespace SelectionNameType {}
namespace SelectionNoteRecord {}
namespace SelectionNoteReferenceMixin {}
namespace SelectionPedigreeLinkageType {}
namespace SelectionPhonetizationMethod {}
namespace SelectionPhonetization {}
namespace SelectionPlace {}
namespace SelectionRecord {}
namespace SelectionReferenceNumber {}
namespace SelectionReference {}
namespace SelectionRepositoryRecord {}
namespace SelectionRepositoryReference {}
namespace SelectionRomanizationMethod {}
namespace SelectionRomanization {}
namespace SelectionSex {}
namespace SelectionSourceCertainty {}
namespace SelectionSourceCitation {}
namespace SelectionSourceData {}
namespace SelectionSourceRecord {}
namespace SelectionSpouseEventDetails {}
namespace SelectionSpouseFamilyLink {}
namespace SelectionSubmitterRecord {}
namespace SelectionSubmitterReference {}
namespace SelectionTime {}

namespace SelectionWithNoteMixin {}
namespace SelectionWithSourceCitationMixin {}

export namespace GedcomSelection {
    export import Any = SelectionAny;
    export import AddressStructure = SelectionAddressStructure;
    export import Address = SelectionAddress;
    export import Adoption = SelectionAdoption;
    export import Association = SelectionAssociation;
    export import Changed = SelectionChanged;
    export import CharacterEncoding = SelectionCharacterEncoding;
    export import ChildFamilyLink = SelectionChildFamilyLink;
    export import CitationData = SelectionCitationData;
    export import CitationEvent = SelectionCitationEvent;
    export import Coordinates = SelectionCoordinates;
    export import Corporation = SelectionCorporation;
    export import DataSource = SelectionDataSource;
    export import DateExact = SelectionDateExact;
    export import DatePeriod = SelectionDatePeriod;
    export import DatePunctual = SelectionDatePunctual;
    export import Date = SelectionDate;
    export import EventsRecorded = SelectionEventsRecorded;
    export import Event = SelectionEvent;
    export import FamilyEvent = SelectionFamilyEvent;
    export import FamilyRecord = SelectionFamilyRecord;
    export import FamilyReferenceAdoption = SelectionFamilyReferenceAdoption;
    export import FamilyReference = SelectionFamilyReference;
    export import GedcomFile = SelectionGedcomFile;
    export import GedcomForm = SelectionGedcomForm;
    export import GedcomSource = SelectionGedcomSource;
    export import Gedcom = SelectionGedcom;
    export import GedcomVersion = SelectionGedcomVersion;
    export import Header = SelectionHeader;
    export import IndividualAttribute = SelectionIndividualAttribute;
    export import IndividualEventFamilyAdoption = SelectionIndividualEventFamilyAdoption;
    export import IndividualEventFamily = SelectionIndividualEventFamily;
    export import IndividualEvent = SelectionIndividualEvent;
    export import IndividualRecord = SelectionIndividualRecord;
    export import IndividualReference = SelectionIndividualReference;
    export import MediaType = SelectionMediaType;
    export import MetaEvent = SelectionMetaEvent;
    export import MultimediaFile = SelectionMultimediaFile;
    export import MultimediaFormat = SelectionMultimediaFormat;
    export import MultimediaRecord = SelectionMultimediaRecord;
    export import MultimediaReference = SelectionMultimediaReference;
    export import NamePhonetization = SelectionNamePhonetization;
    export import NamePieces = SelectionNamePieces;
    export import NameRomanization = SelectionNameRomanization;
    export import Name = SelectionName;
    export import NameType = SelectionNameType;
    export import NoteRecord = SelectionNoteRecord;
    export import NoteReferenceMixin = SelectionNoteReferenceMixin;
    export import PedigreeLinkageType = SelectionPedigreeLinkageType;
    export import PhonetizationMethod = SelectionPhonetizationMethod;
    export import Phonetization = SelectionPhonetization;
    export import Place = SelectionPlace;
    export import Record = SelectionRecord;
    export import ReferenceNumber = SelectionReferenceNumber;
    export import Reference = SelectionReference;
    export import RepositoryRecord = SelectionRepositoryRecord;
    export import RepositoryReference = SelectionRepositoryReference;
    export import RomanizationMethod = SelectionRomanizationMethod;
    export import Romanization = SelectionRomanization;
    export import Sex = SelectionSex;
    export import SourceCertainty = SelectionSourceCertainty;
    export import SourceCitation = SelectionSourceCitation;
    export import SourceData = SelectionSourceData;
    export import SourceRecord = SelectionSourceRecord;
    export import SpouseEventDetails = SelectionSpouseEventDetails;
    export import SpouseFamilyLink = SelectionSpouseFamilyLink;
    export import SubmitterRecord = SelectionSubmitterRecord;
    export import SubmitterReference = SelectionSubmitterReference;
    export import Time = SelectionTime;

    export namespace Mixin {
        export import WithNote = SelectionWithNoteMixin;
        export import WithSourceCitation = SelectionWithSourceCitationMixin;
    }
}

export namespace GedcomSelection {
    /** @ignore */
    export type Any = SelectionAny;
    /** @ignore */
    export type AddressStructure = SelectionAddressStructure;
    /** @ignore */
    export type Address = SelectionAddress;
    /** @ignore */
    export type Adoption = SelectionAdoption;
    /** @ignore */
    export type Association = SelectionAssociation;
    /** @ignore */
    export type Changed = SelectionChanged;
    /** @ignore */
    export type CharacterEncoding = SelectionCharacterEncoding;
    /** @ignore */
    export type ChildFamilyLink = SelectionChildFamilyLink;
    /** @ignore */
    export type CitationData = SelectionCitationData;
    /** @ignore */
    export type CitationEvent = SelectionCitationEvent;
    /** @ignore */
    export type Coordinates = SelectionCoordinates;
    /** @ignore */
    export type Corporation = SelectionCorporation;
    /** @ignore */
    export type DataSource = SelectionDataSource;
    /** @ignore */
    export type DateExact = SelectionDateExact;
    /** @ignore */
    export type DatePeriod = SelectionDatePeriod;
    /** @ignore */
    export type DatePunctual = SelectionDatePunctual;
    /** @ignore */
    export type Date = SelectionDate;
    /** @ignore */
    export type EventsRecorded = SelectionEventsRecorded;
    /** @ignore */
    export type Event = SelectionEvent;
    /** @ignore */
    export type FamilyEvent = SelectionFamilyEvent;
    /** @ignore */
    export type FamilyRecord = SelectionFamilyRecord;
    /** @ignore */
    export type FamilyReferenceAdoption = SelectionFamilyReferenceAdoption;
    /** @ignore */
    export type FamilyReference = SelectionFamilyReference;
    /** @ignore */
    export type GedcomFile = SelectionGedcomFile;
    /** @ignore */
    export type GedcomForm = SelectionGedcomForm;
    /** @ignore */
    export type GedcomSource = SelectionGedcomSource;
    /** @ignore */
    export type Gedcom = SelectionGedcom;
    /** @ignore */
    export type GedcomVersion = SelectionGedcomVersion;
    /** @ignore */
    export type Header = SelectionHeader;
    /** @ignore */
    export type IndividualAttribute = SelectionIndividualAttribute;
    /** @ignore */
    export type IndividualEventFamilyAdoption = SelectionIndividualEventFamilyAdoption;
    /** @ignore */
    export type IndividualEventFamily = SelectionIndividualEventFamily;
    /** @ignore */
    export type IndividualEvent = SelectionIndividualEvent;
    /** @ignore */
    export type IndividualRecord = SelectionIndividualRecord;
    /** @ignore */
    export type IndividualReference = SelectionIndividualReference;
    /** @ignore */
    export type MediaType = SelectionMediaType;
    /** @ignore */
    export type MetaEvent = SelectionMetaEvent;
    /** @ignore */
    export type MultimediaFile = SelectionMultimediaFile;
    /** @ignore */
    export type MultimediaFormat = SelectionMultimediaFormat;
    /** @ignore */
    export type MultimediaRecord = SelectionMultimediaRecord;
    /** @ignore */
    export type MultimediaReference = SelectionMultimediaReference;
    /** @ignore */
    export type NamePhonetization = SelectionNamePhonetization;
    /** @ignore */
    export type NamePieces = SelectionNamePieces;
    /** @ignore */
    export type NameRomanization = SelectionNameRomanization;
    /** @ignore */
    export type Name = SelectionName;
    /** @ignore */
    export type NameType = SelectionNameType;
    /** @ignore */
    export type NoteRecord = SelectionNoteRecord;
    /** @ignore */
    export type NoteReferenceMixin = SelectionNoteReferenceMixin;
    /** @ignore */
    export type PedigreeLinkageType = SelectionPedigreeLinkageType;
    /** @ignore */
    export type PhonetizationMethod = SelectionPhonetizationMethod;
    /** @ignore */
    export type Phonetization = SelectionPhonetization;
    /** @ignore */
    export type Place = SelectionPlace;
    /** @ignore */
    export type Record = SelectionRecord;
    /** @ignore */
    export type ReferenceNumber = SelectionReferenceNumber;
    /** @ignore */
    export type Reference = SelectionReference;
    /** @ignore */
    export type RepositoryRecord = SelectionRepositoryRecord;
    /** @ignore */
    export type RepositoryReference = SelectionRepositoryReference;
    /** @ignore */
    export type RomanizationMethod = SelectionRomanizationMethod;
    /** @ignore */
    export type Romanization = SelectionRomanization;
    /** @ignore */
    export type Sex = SelectionSex;
    /** @ignore */
    export type SourceCertainty = SelectionSourceCertainty;
    /** @ignore */
    export type SourceCitation = SelectionSourceCitation;
    /** @ignore */
    export type SourceData = SelectionSourceData;
    /** @ignore */
    export type SourceRecord = SelectionSourceRecord;
    /** @ignore */
    export type SpouseEventDetails = SelectionSpouseEventDetails;
    /** @ignore */
    export type SpouseFamilyLink = SelectionSpouseFamilyLink;
    /** @ignore */
    export type SubmitterRecord = SelectionSubmitterRecord;
    /** @ignore */
    export type SubmitterReference = SelectionSubmitterReference;
    /** @ignore */
    export type Time = SelectionTime;
}

export * from './mixin';
