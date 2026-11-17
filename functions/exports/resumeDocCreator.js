
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Header,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
  TabStopType,
  BaseXmlComponent,
  PageBreak
} from 'docx';
import { saveAs } from 'file-saver';
import EducationDisplay from '../../assets/components/resumeItems/education';

export default function GenerateDocument(data) {
  const details = data?.details ?? data ?? {};
  const firstName = details.firstName ?? '';
  const lastName = details.lastName ?? '';
  const jobTitle = details.jobTitle ?? '';
  const phoneNumber = details.phonenumber ?? details.phoneNumber ?? '';
  const email = details.email ?? '';
  const linkedIn = details.linkedin ?? details.LinkedIn ?? '';
  const linkedInUrl = linkedIn && /^https?:\/\//i.test(linkedIn)
    ? linkedIn
    : linkedIn
      ? `https://${linkedIn}`
      : '';
  const hiddenBorder = { style: BorderStyle.NIL, size: 0, color: 'FFFFFF' };
  const borders = {
    top: hiddenBorder,
    bottom: hiddenBorder,
    left: hiddenBorder,
    right: hiddenBorder,
    insideHorizontal: hiddenBorder,
    insideVertical: hiddenBorder,
  };

  //// SET UP ////
  const blankLine = () => new Paragraph({
    children: [new TextRun({ text: ' ', font: 'Times New Roman'})],
    spacing: { after: 50 }
  })
  const pageBreak = () => new Paragraph({
    children: [new PageBreak()]
  })

  /// //// ///// HEADING ITEMS ///// //// ///
  const nameParagraph = [];
  nameParagraph.push(new Paragraph({
    children: [
      new TextRun({
        text: `${firstName} ${lastName}`.trim(),
        bold: true,
        font: 'Times New Roman',
        size: 50,
      }),
    ],
  }));

    nameParagraph.push(new Paragraph({
    alignment: AlignmentType.LEFT,
    children: [new TextRun({ 
        text: jobTitle, 
        font:'Times New Roman', 
        size: 30,
        italics: true})]
  }))

  const contactParagraphs = [];

  if (phoneNumber) {
    contactParagraphs.push(new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ text: phoneNumber + ' | ' + email, font: 'Times New Roman', size: 20 })],
    }));
  }

  if (linkedInUrl) {
    contactParagraphs.push(new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new ExternalHyperlink({
        link: linkedInUrl,
        children: [new TextRun({
          text: 'LinkedIn Profile',
          font: 'Times New Roman',
          size: 20,
          color: '0563C1',
        })],
      })],
    }));
  }

  /// //// ///// SUMMARY ///// //// ///
  const summary = data?.details?.summary
  const summaryTitle = new Table({
    tabStops: [{ type: TabStopType.LEFT, position: 30}],
    width: { size:100, type: WidthType.PERCENTAGE},
    columnWidths: [9360],
    layout: TableLayoutType.FIXED,
    borders,
    rows: [new TableRow({
        children: [new TableCell({
            width: {size: 9360, type: WidthType.DXA},
            borders,
            shading: { type: ShadingType.CLEAR, fill: 'D9D9D9'},
            children: [new Paragraph({
            children: [new TextRun({
                text: 'Summary',
                bold: true,
                font: 'Times New Roman',
                size: 24,
                })],
             })],
        })]
    })]
  })

    const SummaryParagraph = new Paragraph({
        children: [new TextRun({
            text: summary ?? '',
            font: 'Times New Roman',
            fontSize: 12
        })]
  })


  /// //// ///// EDUCATION ///// //// ///

  const education = data?.resumeItems?.education ?? [];
  const educationTitle = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [9360],
    layout: TableLayoutType.FIXED,
    borders,
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9360, type: WidthType.DXA },
        borders,
        shading: { type: ShadingType.CLEAR, fill: 'D9D9D9' },
        children: [new Paragraph({
          children: [new TextRun({
            text: 'Education',
            bold: true,
            font: 'Times New Roman',
            size: 24,
          })],
        })],
      })],
    })],
  });

  const educationContent = education.flatMap((item) => {
    const schoolName = item?.schoolName ?? '';
    const degree = item?.degree ?? '';
    const location = typeof item.location === 'string' ? item.location 
    : [item.city, item.state].filter(Boolean).join(', ')
    const endDate = item?.endSchoolDate ?? '';
    const educationTable = new Table({
        width: {size: 100, type: WidthType.PERCENTAGE},
        columnWidths: [4680, 4680],
        layout: TableLayoutType.FIXED,
        borders,
        rows: [new TableRow({
            children: [
                new TableCell({
                    width: { size: 4680, type: WidthType.DXA },
                    borders,
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: schoolName, 
                                    bold: true,
                                    font: 'Times New Roman',
                                    size: 22
                                })
                            ]
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: degree, 
                                    font: 'Times New Roman',
                                    size: 20
                                })
                            ]
                        })

                    ]
                }),
                new TableCell({
                    width: { size: 4680, type: WidthType.DXA },
                    borders,
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: location, 
                                    font: 'Times New Roman',
                                    size: 22
                                })
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: endDate, 
                                    font: 'Times New Roman',
                                    size: 22
                                })
                            ]
                        })
                        
                    ]
                })
            ]
        })]
    }) 

    return (educationTable)
  })

  /// //// ///// WORKHISTORY ///// //// ///

  const workHistory = data?.resumeItems?.history ?? [];
  const workHistoryTitle = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [9360],
    layout: TableLayoutType.FIXED,
    borders,
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9360, type: WidthType.DXA },
        borders,
        shading: { type: ShadingType.CLEAR, fill: 'D9D9D9' },
        children: [new Paragraph({
          children: [new TextRun({
            text: 'Work History',
            bold: true,
            font: 'Times New Roman',
            size: 24,
          })],
        })],
      })],
    })],
  });
  const workHistoryContent = workHistory.flatMap((item) => {
    const location = typeof item.location === 'string'
      ? item.location
      : [item.location?.city, item.location?.state].filter(Boolean).join(', ');
    const dateRange = [item.startDate, item.endDate].filter(Boolean).join(' - ');
    const roleTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      columnWidths: [4680, 4680],
      layout: TableLayoutType.FIXED,
      borders,
      rows: [new TableRow({
        children: [
          new TableCell({
            width: { size: 4680, type: WidthType.DXA },
            borders,
            children: [
              new Paragraph({
                children: [new TextRun({ 
                    text: item.compName ?? item.company ?? '', 
                    bold: true, 
                    font: 'Times New Roman', 
                    size: 22 })],
              }),
              new Paragraph({
                children: [new TextRun({ 
                    text: item.jobTitle ?? '', 
                    font: 'Times New Roman', 
                    size: 20 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 4680, type: WidthType.DXA },
            borders,
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: location, font: 'Times New Roman', size: 20 })],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: dateRange, font: 'Times New Roman', size: 20 })],
              }),
            ],
          }),
        ],
      })],
    });
    const skills = Array.isArray(item.skills) ? item.skills : [];
    const skillParagraphs = skills.map((skill) => new Paragraph({
      bullet: { level: 0 },
      children: [new TextRun({ text: String(skill), font: 'Times New Roman', size: 20 })],
    }));

    return [roleTable, ...skillParagraphs];
  });

  /// //// ///// SKILLS ///// //// ///
  const skills = data?.resumeItems?.skills ?? [];
  const skillsTitle = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [9360],
    layout: TableLayoutType.FIXED,
    borders,
    rows: [new TableRow({
      children: [new TableCell({
        width: { size: 9360, type: WidthType.DXA },
        borders,
        shading: { type: ShadingType.CLEAR, fill: 'D9D9D9' },
        children: [new Paragraph({
          children: [new TextRun({
            text: 'Skills',
            bold: true,
            font: 'Times New Roman',
            size: 24,
          })],
        })],
      })],
    })],
  });
  const skillRows = []

  for (let i = 0; i < skills.length; i += 2) {
        const pair = [skills[i], skills[i + 1]];

        const cells = pair.map((skill) => new TableCell({
            width: { size: 4680, type: WidthType.DXA },
            borders,
            children: [
                new Paragraph({
                    bullet: {level: 0},
                    alignment: AlignmentType.LEFT,
                    children: [
                        new TextRun({
                            text: skill?.skill ?? '', 
                            font: 'Times New Roman',
                            size: 18
                        })
                    ]
                })
            ]
        }))

        skillRows.push(new TableRow({ children: cells }))
  }

  const skillContent = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [4680, 4680],
    layout: TableLayoutType.FIXED,
    borders,
    rows: skillRows
  })

  /// Document Creation ///
  const heading = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [4680, 4680],
    layout: TableLayoutType.FIXED,
    borders,
    rows: [new TableRow({
      children: [
        new TableCell({
          width: { size: 4680, type: WidthType.DXA },
          borders,
          children: nameParagraph,
        }),
        new TableCell({
          width: { size: 4680, type: WidthType.DXA },
          borders,
          children: contactParagraphs.length > 0
            ? contactParagraphs
            : [new Paragraph({ children: [new TextRun({ text: '', font: 'Times New Roman' })] })],
        }),
      ],
    })],
});

  const doc = new Document({
    sections: [{
      headers: {
        default: new Header({ children: [heading] }),
      },
      children: [
        blankLine(),
        summaryTitle, 
        blankLine(),
        SummaryParagraph, 
        blankLine(),
        educationTitle,
        blankLine(),
        ...educationContent,
        blankLine(),
        workHistoryTitle, 
        blankLine(),
        ...workHistoryContent,
        blankLine(),
        skillsTitle,
        blankLine(),
        skillContent,
        pageBreak(),
        skillsTitle
    ],
    }],
  });

  Packer.toBlob(doc).then((blob) => {
    const fileName = `${jobTitle}`.trim() || 'resume';
    saveAs(blob, `${fileName}.docx`);
  });
}