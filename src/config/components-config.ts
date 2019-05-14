import {InjectionToken} from "@angular/core";
import {TOKENS} from "../config/component-tokens";
import {ARTICLES} from "../config/help-article-tokens";
import {environment} from "../environments/environment.prod";

/**
 * basic interface for a pharos api call configuratiogit n object
 */
interface PharosApi {
  /**
   * field name
   */
  field: string;

  /**
   * readable label
   */
  label?: string;

  /**
   * url to call to retrieve data
   */
  url?: string;

  /**
   * description of field/api call to be used in help panel
   */
  description?: string;

  /**
   * source or provenance of data
   * todo not yet implemented/retrieved
   */
  source?: string;

  /**
   * option injection token for adding a detailed article about the api to be used in help panel
   */
  article?: InjectionToken<string>;
}

/**
 * navigation header object, sets us the details sidenav
 */
interface PharosNavHeader {
  /**
   * readable label for section
   */
  label?: string;

  /**
   * variable for section
   */
  section?: string;

  /**
   * description of section to be used in help panel
   */
  mainDescription?: string;
}

/**
 * main panel object that is injected into the page
 */
interface PharosPanel {
  /**
   * token for the panel component
   */
  token: InjectionToken<string>;
  /**
   * navigation header to add to the sidenav
   */
  navHeader?: PharosNavHeader;

  /**
   * list of various api calls to retrieve data specific to the panel
   */
  api?: PharosApi[]
}

/**
 * pharos host url
 * todo might not want to bring environment variables into play here
 * @type {string}
 * @private
 */
const _HOST = environment.host;

/**
 * api version string
 * @type {string}
 * @private
 */
const _API = environment.api;

/**
 * full api url created by concating the host and api version
 * @type {string}
 * @private
 */
const _APIURL = _HOST + _API;

/**
 * main target list table component
 * @type {PharosPanel}
 */
const TARGET_TABLE_COMPONENT: PharosPanel = {
  token: TOKENS.TARGET_TABLE_COMPONENT,
  api: [
    {
      field: 'facets',
      url: _APIURL + 'targets/search?top=0'
    }, {
      field: 'data',
      url: _APIURL + 'targets?top=10'
    }
  ]
};

/**
 * main target header component
 * @type {PharosPanel}
 */
const TARGET_HEADER_COMPONENT: PharosPanel = {
  token: TOKENS.TARGET_HEADER_COMPONENT,
  api: []
};

/**
 * target gene summary component
 * @type {PharosPanel}
 */
const TARGET_GENE_SUMMARY_COMPONENT: PharosPanel = {
  token: TOKENS.TARGET_GENE_SUMMARY_COMPONENT,
  api: [
    {
      field: 'geneSummary',
      url: _APIURL + 'targets/_id_/properties(label=NCBI%20Gene%20Summary)'
    }
  ]
};

/**
 * target breadcrumb component
 * @type {PharosPanel}
 */
const PHAROS_BREADCRUMB_COMPONENT: PharosPanel = {
  token: TOKENS.PHAROS_BREADCRUMB_COMPONENT,
  api: [
    {
      field: 'dto',
      url: _APIURL + 'targets/_id_/properties(label=DTO%20Protein%20Class*)'
    },
    {
      field: 'breadcrumb',
      url: _APIURL + 'targets/_id_/properties(label=PANTHER%20Protein%20Class*)'
    }
  ]
};

/**
 * target details page component
 * primary holder for all subsequent panels
 * @type {PharosPanel}
 */
const TARGET_DETAILS_COMPONENT: PharosPanel = {
  token: TOKENS.TARGET_DETAILS_COMPONENT,
  api: []
};

/**
 * target summary component
 * @type {PharosPanel}
 */
const SUMMARY_PANEL: PharosPanel = {
  token: TOKENS.SUMMARY_PANEL,
  navHeader: {
    label: 'Protein Summary',
    section: 'summary'
  },
  api: [
    {
      field: 'synonyms',
      label: 'Uniprot Accession IDs',
      url: _APIURL + 'targets/_id_/synonyms(label=UniProt%20Accession)',
      description: 'Uniprot linked accession values, symbols or commonly used abbreviations associated with' +
      ' this particular target.',
      source: ''
    },
    {
      field: 'symbol',
      label: 'Symbol',
      url: _APIURL + 'targets/_id_/synonyms(label=UniProt%20Shortname)',
      description: 'List of abbreviations or acronyms of the full target name.'
    },
    {
      field: 'gene',
      label: 'Gene Name',
      url: _APIURL + 'targets/_id_/synonyms(label=UniProt%20Gene)',
      description: 'Approved gene symbol with link to HUGO Gene Nomenclature Committee.'
    },
    {
      field: 'ensembl',
      label: 'Ensembl ID',
      url: _APIURL + 'targets/_id_/synonyms(label=Ensembl)',
      description: 'Ensembl identifier links.',
      source: 'Ensembl is a genome browser for vertebrate genomes that supports research in comparative genomics,' +
      ' evolution, sequence variation and transcriptional regulation. Ensembl annotate genes, computes ' +
      'multiple alignments, predicts regulatory function and collects disease data. '
    },
    {
      field: 'knowledge',
      label: 'Illumination Graph',
      url: _HOST + 'hg/data?type=radar-attr_type&q=_accession_',
      description: 'Radar plot depicting the variety of knowledge obtained by Pharos for a particular target. ' +
      'The more spikes in the plot, the more variety. The longer the length, the higher the quantity of that particular ' +
      'knowledge. Clicking the illumination graph opens an expanded view to explore the plot fuller by seeing ' +
      'plot with annotations of the different radii.',
      // allowing for aggregation of knowledge radii based on ' +
      // 'attribution type, group, or data type, as well as overlay plot with other information, and provide download file.'
      article: ARTICLES.ILLUMINATION_GRAPH_ARTICLE
    },
    {
      field: 'knowledgeTable',
      label: 'Knowledge Table',
      description: 'Table representing the top 5 knowledge attributes in the illumination graph. ' +
      'The knowledge value property is on a scale of 0 to 1.'
    },
  ]
};

/**
 * target idg level summary component
 * @type {PharosPanel}
 */
const LEVEL_SUMMARY_PANEL: PharosPanel = {
  token: TOKENS.LEVEL_SUMMARY_PANEL,
  navHeader: {
    label: 'IDG Development Level Summary',
    section: 'development'
  },
  api: [
    {
      field: 'idgTDL',
      label: 'Target Development Level',
      description: 'Computed IDG Target Development Level',
      article: ARTICLES.TARGET_DEVELOPMENT_ARTICLE
    },
    {
      field: 'generif',
      label: 'GeneRIF',
      url: _APIURL + 'targets/_id_/links(kind=ix.core.models.Text)',
      description: 'Total count of NCBI Gene Reference Into Function hits for target listed in parenthesis, ' +
      'and summary table with links to publications per PMID with the specific text in article that includes ' +
      'the reported target.'
    },
    {
      field: 'omim',
      label: 'OMIM Term',
      url: _APIURL + 'targets/_id_/properties(label=OMIM%20Term*)'
    },
    {
      field: 'goFunction',
      label: 'GO Function',
      url: _APIURL + 'targets/_id_/properties(label=GO%20Function*)',
      description: 'Function listed by GO database for target, with total count listed in parenthesis. ' +
      'Listing individual functions with links to GO. Click on bargraph icon to explore further the Summary of GO Function.'
    },
    {
      field: 'goComponent',
      label: 'GO Component',
      url: _APIURL + 'targets/_id_/properties(label=GO%20Component*)',
      description: 'Cellular component listed by GO database for target, with total count listed in ' +
      'parenthesis. Listing individual functions with links to GO. Click on bargraph icon to explore further ' +
      'the Summary of GO Function.'
    },
    {
      field: 'goProcess',
      label: 'GO Process',
      url: _APIURL + 'targets/_id_/properties(label=GO%20Process*)',
      description: 'Biological process listed by GO database for target, with total count listed in parenthesis.' +
      'Listing individual functions with links to GO. Click on bargraph icon to explore further the Summary ' +
      'of GO Function.'
    },
    {
      field: 'ligandsCount',
      label: 'Ligands Count',
      url: _APIURL + 'targets/_id_/ligands/@count',
      description: 'Ligands associated with a target, listed in ChEMBL, with activity over a cutoff relative to the target' +
      'class.',
      article: ARTICLES.LIGAND_ACTIVITY_ARTICLE
    },
    {
      field: 'drugsCount',
      label: 'Drugs Count',
      url: _APIURL + 'targets/_id_/drugs/@count',
      description: 'Approved drugs associated with a target.'
    }
  ]
};

/**
 * idg resources for target panel component
 * @type {PharosPanel}
 */
const IDG_RESOURCES_PANEL: PharosPanel = {
  token: TOKENS.IDG_RESOURCES_PANEL,
  navHeader: {
    label: 'IDG Generated Resources',
    section: 'resources'
  },
  api: []
};

/**
 * target disease relevance component
 * @type {PharosPanel}
 */
const DISEASE_SOURCE_PANEL: PharosPanel = {
  token: TOKENS.DISEASE_SOURCE_PANEL,
  navHeader: {
    label: 'Disease Associations by Source',
    section: 'diseaseRelationships',
    mainDescription: 'This is a list of diseases associated with this target, compiled by several resources. Each' +
    'resource provides different confidence measurements and association values, which are described below.'
  },
  api: [
    {
      field: 'diseaseSources',
      label: 'Disease Association Sources',
      url: _APIURL + 'targets/_id_/links(kind=ix.idg.models.Disease)',
      description: 'Disease-gene associations mined from Medline Franklid et al, Methods, 2015, 83-89'
    }, {
      field: 'tinx',
      label: 'Disease Novelty (Tinx)',
      url: _HOST + 'tinx/target/_accession_',
      description: 'TIN-X is an interactive visualization tool for discovering interesting associations between diseases ' +
      'and potential drug targets.',
      article: ARTICLES.TINX_ARTICLE
    }
  ]
};

/**
 * ligands associated with target component
 * @type {PharosPanel}
 */
const LIGANDS_PANEL: PharosPanel = {
  token: TOKENS.LIGANDS_PANEL,
  navHeader: {
    label: 'Associated Ligands',
    section: 'ligands'
  },
  api: [
    {
      field: 'ligands',
      label: 'Ligands',
      url: _APIURL + 'targets/_id_/ligands?view=full',
      description: 'Table allowing for paging of active ligands ligand lists.  ' +
      'The order is based on reported pKd or pKi.',
      article: ARTICLES.LIGAND_ACTIVITY_ARTICLE
    },
    {
      field: 'count',
      label: 'Ligands Ligands',
      url: _APIURL + 'targets/_id_/ligands/@count',
      description: 'Ligands associated with a target, listed in ChEMBL, with activity over a cutoff relative to the target' +
      'class.'
    }
  ]
};

/**
 * approved drugs associated with target component
 * @type {PharosPanel}
 */
const DRUGS_PANEL: PharosPanel = {
  token: TOKENS.LIGANDS_PANEL,
  navHeader: {
    label: 'Approved Drugs',
    section: 'drugs'
  },
  api: [
    {
      field: 'drugs',
      label: 'Approved Drugs',
      url: _APIURL + 'targets/_id_/drugs?view=full',
      description: 'Table allowing for paging of associated drugs.  ' +
      'The order is based on reported pKd or pKi.'
    },
    {
      field: 'count',
      label: 'Drugs Count',
      url: _APIURL + 'targets/_id_/drugs/@count',
      description: 'Approved drugs associated with a target.'
    }
  ]
};

/**
 * Protein database viewer component
 * @type {PharosPanel}
 */
const PDB_PANEL: PharosPanel = {
  token: TOKENS.PDB_PANEL,
  navHeader: {
    label: 'PDB Viewer',
    section: 'pdb'
  },
  api: [
    {
      field: 'pdb',
      url: _APIURL + 'targets/_id_/synonyms(label=PDB%20ID)',
      description: 'Publications associated with this target, as identified using the JensenLab text mining protocol'
    }
  ]
};

/**
 * tissue expression component
 * @type {PharosPanel}
 */
const EXPRESSION_PANEL: PharosPanel = {
  token: TOKENS.EXPRESSION_PANEL,
  navHeader: {
    label: 'Target Expression Data',
    section: 'expression',
    mainDescription: 'Gene expression data from various sources.'
  },
  api: [
    {
      field: 'expression',
      label: 'Gene expression Data',
      url: _APIURL + 'targets/_id_/properties(label=*Tissue)',
      description: ''
    },
    {
      field: 'specificity',
      label: 'Target Tissue Specificity',
      url: _APIURL + 'targets/_id_/properties(label=*Tissue)',
      description: 'Target tissue specificity, ranges from 0 (non-specific) - 1 specific to one tissue, calculated ' +
      'according to Yanai et al, Bioinformatics 2005, 650-659'
    },
    {
      field: 'differential',
      label: 'Differential Expression',
      url: _APIURL + 'targets/_id_/links(kind=ix.idg.models.Disease)',
      description: 'Diseases in which this target has shown to have differential expression ' +
      'as reported in Expression Atlas'
    },
    {
      field: 'orthologs',
      label: 'Ortholog Species',
      url: _APIURL + 'targets/_id_/links(kind=ix.idg.models.Ortholog)',
      description: 'Ortholog species'
    }
  ]
};

/**
 * protein to protein interaction component
 * @type {PharosPanel}
 */
const PROTEIN_PROTEIN_PANEL: PharosPanel = {
  token: TOKENS.PROTEIN_PROTEIN_PANEL,
  navHeader: {
    label: 'Protein to Protein Interactions',
    section: 'ppi'
  },
  api: [
    {
      field: 'interactions',
      url: _APIURL + 'predicates?filter=predicate%3D%27Protein-Protein+Interactions%27+AND+subject.refid%3D_id_'
    }
  ]
};

/**
 * target publication and gene rif component
 * @type {PharosPanel}
 */
const PUBLICATION_INFO_PANEL: PharosPanel = {
  token: TOKENS.PUBLICATION_INFO_PANEL,
  navHeader: {
    label: 'Publication Information',
    section: 'publicationsPanel',
    mainDescription: 'Statistics about the occurence of this target in literature, extracted via text mining. GeneRIFs,' +
    'and text-mined publications are also displayed.'
  },
  api: [
    {
      field: 'pubmed',
      label: 'Pubmed Score',
      url: _APIURL + 'targets/_id_/properties(label=NCBI%20Gene%20PubMed%20Count)',
      description: '',
      article: ARTICLES.PUBMED_SCORE_ARTICLE
    },
    {
      field: 'pmscore',
      label: 'Pubmed Score Timeline',
      url: _APIURL + 'targets/_id_/pmscore',
      description: ''
    },
    {
      field: 'pubtator',
      label: 'Pubtator Score Timeline',
      url: _APIURL + 'targets/_id_/pubtator',
      description: ''
    },
    {
      field: 'patents',
      label: 'Patents Timeline',
      url: _APIURL + 'targets/_id_/patents',
      description: ''
    },
    {
      field: 'publicationCount',
      description: 'Total count of text-mined publication hits for target listed in parenthesis'
    },
    {
      field: 'publications',
      label: 'Text Mined References',
      url: _APIURL + 'targets/_id_/publications?top=10',
      description: 'Publications associated with this target, as identified using the JensenLab text mining protocol'
    },
    {
      field: 'generifCount',
      url: _APIURL + 'targets/_id_/generifs/@count',
      description: 'Total count of NCBI Gene Reference Into Function hits for target listed in parenthesis'
    },
    {
      field: 'generifs',
      label: 'GeneRIFs',
      url: _APIURL + 'targets/_id_/generifs',
      description: 'Total count of NCBI Gene Reference Into Function hits for target listed in parenthesis, ' +
      'and summary table with links to publications per PMID with the specific text in article that includes ' +
      'the reported target.'
    }
  ]
};

/**
 * target sequence component
 * @type {PharosPanel}
 */
const AA_SEQUENCE_PANEL: PharosPanel = {
  token: TOKENS.AA_SEQUENCE_PANEL,
  navHeader: {
    label: 'Sequence Details',
    section: 'sequence'
  },
  api: [
    {
      field: 'sequence',
      url: _APIURL + 'targets/_id_/properties(label=UniProt%20Sequence)',
      description: 'Amino acid sequence of target protein, bar graph summarizing quantity of each amino acid. ' +
      'Click on looking glass icon for ability to conduct sequence search.'
    }
  ]
};

/**
 * list of facets related to target component
 * @type {PharosPanel}
 */
const TARGET_FACET_PANEL: PharosPanel = {
  token: TOKENS.TARGET_FACET_PANEL,
  navHeader: {
    label: 'Related Targets',
    section: 'relatedTargets'
  },
  api: [
    {
      field: 'pantherProteinClass',
      url: _APIURL + 'targets/_id_/properties(label=PANTHER%20Protein%20Class*)'
    }, {
      field: 'goFunction',
      url: _APIURL + 'targets/_id_/properties(label=GO%20Function*)',
      description: 'Function listed by GO database for target, with total count listed in parenthesis. ' +
      'Listing individual functions with links to GO. Click on bargraph icon to explore further the Summary of GO Function.'
    }, {
      field: 'goComponent',
      url: _APIURL + 'targets/_id_/properties(label=GO%20Component*)',
      description: 'Cellular component listed by GO database for target, with total count listed in ' +
      'parenthesis. Listing individual functions with links to GO. Click on bargraph icon to explore further ' +
      'the Summary of GO Function.'
    }, {
      field: 'goProcess',
      url: _APIURL + 'targets/_id_/properties(label=GO%20Process*)',
      description: 'Biological process listed by GO database for target, with total count listed in parenthesis.' +
      'Listing individual functions with links to GO. Click on bargraph icon to explore further the Summary ' +
      'of GO Function.'
    }, {
      /*  field: 'goTerms',
        url: _APIURL + 'targets/_id_/properties(label=NCBI%20Gene%20PubMed%20Count)'
      }, {*/
      field: 'gwasTrait',
      url: _APIURL + 'targets/_id_/properties(label=GWAS%20Trait*)'
    },
    {
      field: 'rnaCellLine',
      url: _APIURL + 'targets/_id_/properties(label=HCA%20RNA%20Cell%20Line*)'
    },
    {
      field: 'omim',
      url: _APIURL + 'targets/_id_/properties(label=OMIM%20Term*)'
    },
    {
      field: 'uniprotKeyword',
      url: _APIURL + 'targets/_id_/properties(label=UniProt%20Keyword*)',
      description: 'Occurrence of target in the 10 categories of UniProt keywords.'
    }
  ]
};


/*
*DISEASE COMPONENTS
*
 */

/**
 * main disease list component
 * @type {PharosPanel}
 */
const DISEASE_TABLE_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_TABLE_COMPONENT,
  api: [
    {
      field: 'facets',
      url: _APIURL + 'disease/search?top=0'
    }, {
      field: 'data',
      url: _APIURL + 'disease?top=10'
    }
  ]
};

/**
 * disease summary header component
 * @type {PharosPanel}
 */
const DISEASE_HEADER_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_HEADER_COMPONENT,
  api: []
};

/**
 * main disease details page component
 * @type {PharosPanel}
 */
const DISEASE_DETAILS_COMPONENT: PharosPanel = {
  token: TOKENS.DISEASE_DETAILS_COMPONENT,
  api: []
};

/**
 * list of targets associated ith a disease component
 * @type {PharosPanel}
 */
const TARGET_LIST_PANEL: PharosPanel = {
  token: TOKENS.TARGET_LIST_PANEL,
  api: [
    {
      field: 'targets',
      url: _APIURL + 'diseases/_id_/links(kind=ix.idg.models.Target)?top=10'
    }
  ]
};

/**
 * main list of ligands component
 * @type {PharosPanel}
 */
const LIGAND_TABLE_COMPONENT: PharosPanel = {
  token: TOKENS.LIGAND_TABLE_COMPONENT,
  api: [
    {
      field: 'facets',
      url: _APIURL + 'ligands/search?top=20'
    }, {
      field: 'data',
      url: _APIURL + 'ligands?top=20'
    }
  ]
};

/**
 * main ligand details page component
 * @type {PharosPanel}
 */
const LIGAND_DETAILS_COMPONENT: PharosPanel = {
  token: TOKENS.LIGAND_DETAILS_COMPONENT,
  api: []
};

/**
 * main ligand header component
 * @type {PharosPanel}
 */
const LIGAND_HEADER_COMPONENT: PharosPanel = {
  token: TOKENS.LIGAND_HEADER_COMPONENT,
  api: []
};

/**
 * ligand structure view component
 * @type {PharosPanel}
 */
const STRUCTURE_VIEW_PANEL: PharosPanel = {
  token: TOKENS.STRUCTURE_VIEW_PANEL,
  api: [
    {
      field: 'structure',
      url: _APIURL + 'ligands/_id_/links(kind=ix.core.models.Structure)'
    }
  ]
};

/**
 * targets related to a ligand component
 * @type {PharosPanel}
 */
const TARGET_RELEVANCE_PANEL: PharosPanel = {
  token: TOKENS.TARGET_RELEVANCE_PANEL,
  api: [
    {
      field: 'targetRelevance',
      url: _APIURL + 'ligands/_id_/links(kind=ix.idg.models.Target)'
    }
  ]
};

/**
 * ligand synonyms component
 * @type {PharosPanel}
 */
const SYNONYMS_PANEL: PharosPanel = {
  token: TOKENS.SYNONYMS_PANEL,
  api: [
    {
      field: 'synonyms',
      url: _APIURL + 'ligands/_id_/synonyms'
    }
  ]
};

/**
 * ligand molecular definition component
 * @type {PharosPanel}
 */
const MOLECULAR_DEFINITION_PANEL: PharosPanel = {
  token: TOKENS.MOLECULAR_DEFINITION_PANEL,
  api: [
    {
      field: 'properties',
      url: _APIURL + 'ligands/_id_/links(kind=ix.core.models.Structure)'
    }
  ]
};


/**
 *map of components to build section of pharos
 * @type {Map<string, any>}
 */
export const COMPONENTSCONFIG: Map<string, any> = new Map<string, any>(
  [
    ['targets', {
      list: {
        components: [
          TARGET_TABLE_COMPONENT
        ]
      },
      default: _HOST + _API + 'targets/search?top=10&skip=0',
      facets: [
        {
          name: 'IDG Development Level',
          label: 'Development Level'
        },
        {
          name: 'Collection',
          label: 'Collection'
        },
        {
          name: 'IMPC Term',
          label: 'IMPC Term'
        },
        {
          name: 'IDG Disease',
          label: 'Disease'
        },
        {
          name: 'IDG Tissue',
          label: 'Tissue'
        },
        {
          name: 'IDG Target Family',
          label: 'Target Family'
        }
      ],
      chartFacets: {
        donut: [
          {
            name: 'IDG Development Level',
            label: 'Development Level'
          },
          {
            name: 'Collection',
            label: 'Collection'
          },
          {
            name: 'IMPC Term',
            label: 'IMPC Term'
          },
          {
            name: 'IDG Disease',
            label: 'Disease'
          },
          {
            name: 'IDG Tissue',
            label: 'Tissue'
          },
          {
            name: 'IDG Target Family',
            label: 'Target Family'
          }
        ],
        sunburst: [],
        cloud: []
      },
      details: {
        components: [
          TARGET_HEADER_COMPONENT,
          TARGET_DETAILS_COMPONENT
        ]
      },
      tdark: {
        components: [
          TARGET_GENE_SUMMARY_COMPONENT,
          PHAROS_BREADCRUMB_COMPONENT,
          SUMMARY_PANEL,
          LEVEL_SUMMARY_PANEL,
         // IDG_RESOURCES_PANEL,
          DISEASE_SOURCE_PANEL,
          PDB_PANEL,
          EXPRESSION_PANEL,
          PROTEIN_PROTEIN_PANEL,
          PUBLICATION_INFO_PANEL,
          AA_SEQUENCE_PANEL,
          TARGET_FACET_PANEL
        ]
      },
      tbio: {
        components: [
          TARGET_GENE_SUMMARY_COMPONENT,
          PHAROS_BREADCRUMB_COMPONENT,
          SUMMARY_PANEL,
          LEVEL_SUMMARY_PANEL,
         // IDG_RESOURCES_PANEL,
          DISEASE_SOURCE_PANEL,
          LIGANDS_PANEL,
          PDB_PANEL,
          EXPRESSION_PANEL,
          PROTEIN_PROTEIN_PANEL,
          PUBLICATION_INFO_PANEL,
          AA_SEQUENCE_PANEL,
          TARGET_FACET_PANEL
        ]
      },
      tchem: {
        components: [
          TARGET_GENE_SUMMARY_COMPONENT,
          PHAROS_BREADCRUMB_COMPONENT,
          SUMMARY_PANEL,
          LEVEL_SUMMARY_PANEL,
         // IDG_RESOURCES_PANEL,
          LIGANDS_PANEL,
          DISEASE_SOURCE_PANEL,
          PDB_PANEL,
          EXPRESSION_PANEL,
          PROTEIN_PROTEIN_PANEL,
          PUBLICATION_INFO_PANEL,
          AA_SEQUENCE_PANEL,
          TARGET_FACET_PANEL
        ]
      },
      tclin: {
        components: [
          TARGET_GENE_SUMMARY_COMPONENT,
          PHAROS_BREADCRUMB_COMPONENT,
          SUMMARY_PANEL,
          LEVEL_SUMMARY_PANEL,
         // IDG_RESOURCES_PANEL,
          DRUGS_PANEL,
          LIGANDS_PANEL,
          DISEASE_SOURCE_PANEL,
          PDB_PANEL,
          EXPRESSION_PANEL,
          PROTEIN_PROTEIN_PANEL,
          PUBLICATION_INFO_PANEL,
          AA_SEQUENCE_PANEL,
          TARGET_FACET_PANEL
        ]
      }
    }],
    ['diseases', {
      list: {
        components: [
          DISEASE_TABLE_COMPONENT
        ]
      },
      default: _HOST + _API + 'diseases/search?top=10&skip=0',
      facets: [
        {
          name: 'IDG Development Level',
          label: 'Development Level'
        },
        {
          name: 'IDG Target Family',
          label: 'Target Family'
        },
        {
          name: 'IDG Drug',
          label: 'Drug'
        },
        {
          name: 'IMPC Term',
          label: 'IMPC Term'
        },
        {
          name: 'IDG Disease',
          label: 'Disease'
        },
        {
          name: 'Data Source',
          label: 'Data Source'
        },
        {
          name: 'DisGeNET Source',
          label: 'DisGeNET Source'
        }
      ],
      chartFacets: {
        donut: [
          {
            name: 'IDG Development Level',
            label: 'Development Level'
          },
          /* {
             name: 'IMPC Term',
             label: 'IMPC Term'
           },*/
          {
            name: 'IDG Disease',
            label: 'Disease'
          },
          {
            name: 'IDG Tissue',
            label: 'Tissue'
          },
          {
            name: 'IDG Target Family',
            label: 'Target Family'
          }
        ],
        sunburst: [],
        cloud: []
      },
      details: {
        components: [
          DISEASE_HEADER_COMPONENT,
          DISEASE_DETAILS_COMPONENT
        ]
      },
      panels: {
        components: [
          // PHAROS_BREADCRUMB_COMPONENT,
          TARGET_LIST_PANEL
        ]
      }
    }],
    ['ligands', {
      list: {
        components: [
          LIGAND_TABLE_COMPONENT
        ]
      },
      default: _HOST + _API + 'ligands/search?top=20&skip=0&view=full',
      facets: [
        {
          name: 'IDG Development Level',
          label: 'Development Level'
        },
        {
          name: 'IDG Target Family',
          label: 'Target Family'
        },
        {
          name: 'IDG Target',
          label: 'Target'
        },
        {
          name: 'Selectivity',
          label: 'Selectivity'
        },
        {
          name: 'Pharmalogical Action',
          label: 'Pharmalogical Action'
        },
        {
          name: 'Ligand Activity',
          label: 'Ligand Activity'
        },
        {
          name: 'Ligand Source',
          label: 'Ligand Source'
        }
      ],
      chartFacets: {
        donut: [
          {
            name: 'IDG Development Level',
            label: 'Development Level'
          },
          {
            name: 'IDG Target Family',
            label: 'Target Family'
          },
          {
            name: 'IDG Target',
            label: 'Target'
          },
          /*        {
                    name: 'Selectivity',
                    label: 'Selectivity'
                  },*/
          {
            name: 'Pharmalogical Action',
            label: 'Pharmalogical Action'
          },
          {
            name: 'Ligand Activity',
            label: 'Ligand Activity'
          },
          {
            name: 'Ligand Source',
            label: 'Ligand Source'
          }
        ],
        sunburst: [],
        cloud: []
      },
      details: {
        components: [
          PHAROS_BREADCRUMB_COMPONENT,
          LIGAND_HEADER_COMPONENT,
          LIGAND_DETAILS_COMPONENT
        ]
      },
      panels: {
        components: [
          STRUCTURE_VIEW_PANEL,
          TARGET_RELEVANCE_PANEL,
          SYNONYMS_PANEL,
          MOLECULAR_DEFINITION_PANEL
        ]
      },
    }],
    ['topics', {
      list: {
        components: [
          {
            token: TOKENS.TOPIC_TABLE_COMPONENT
          }
        ]
      },

      details: {
        components: [
          {
            token: TOKENS.TOPIC_DETAILS_COMPONENT
          }
        ]
      },
      panels: {
        components: [
          {
            token: TOKENS.PHAROS_BREADCRUMB_COMPONENT
          },
          {
            token: TOKENS.TOPIC_HEADER_COMPONENT
          },
          {
            token: TOKENS.TOPIC_GRAPH_PANEL
          },
          {
            token: TOKENS.NODE_DISPLAY_PANEL
          }
        ]
      }
    }],
    ['search', {
      api: [
        {
          field: 'targets',
          url: _HOST + _API + 'targets/search?q='
        },
        {
          field: 'diseases',
          url: _HOST + _API + 'diseases/search?q='
        },
        {
          field: 'ligands',
          url: _HOST + _API + 'ligands/search?view=full&q='
        },
        {
          field: 'publications',
          url: _HOST + _API + 'publications/search?q='
        }
      ],
      facets: [
        {
          name: 'IDG Development Level',
          label: 'Development Level'
        },
        {
          name: 'Collection',
          label: 'Collection'
        },
        {
          name: 'IMPC Term',
          label: 'IMPC Term'
        },
        {
          name: 'IDG Disease',
          label: 'Disease'
        },
        {
          name: 'IDG Tissue',
          label: 'Tissue'
        },
        {
          name: 'IDG Target Family',
          label: 'Target Family'
        }
      ],
      chartFacets: {
        donut: [
          {
            name: 'IDG Development Level',
            label: 'Development Level'
          },
          {
            name: 'Collection',
            label: 'Collection'
          },
          {
            name: 'IMPC Term',
            label: 'IMPC Term'
          },
          {
            name: 'IDG Disease',
            label: 'Disease'
          },
          {
            name: 'IDG Tissue',
            label: 'Tissue'
          },
          {
            name: 'IDG Target Family',
            label: 'Target Family'
          }
        ],
        sunburst: [],
        cloud: []
      }
    }]
    ]
);
