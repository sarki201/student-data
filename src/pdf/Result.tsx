import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

Font.register({
  family: "Lato",
  src: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
});

interface Result {
  coursecode: string;
  title: string;
  credit_unit: number;
  grade: string;
  total_point: number;
}

interface Cumulative {
  unts: number;
  untd: number;
  gpts: number;
  gptd: number;
  gpats: number;
  gpatd: number;
  remarks: string;
}

interface StudentData {
  surname: string;
  firstname: string;
  level: string;
  reg_no: string;
  session: string;
  profile_picture: string;
  result: Result[];
  cummulative: Cumulative;
}

interface ResultPDFProps {
  data: {
    data: StudentData;
    profile_picture: string;
  };
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 23,
    marginHorizontal: 15,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 23,
    marginBottom: 74,
  },
  logo: {
    width: 100,
    height: 100,
  },
  picture: {
    width: 100,
    height: 100,
  },
  headings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading1: {
    // fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "semibold",
    marginBottom: 10,
    lineHeight: "24px",
  },
  heading2: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: "19.2px",
  },
  heading3: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: "14.4px",
  },
  heading4: {
    fontSize: 12,
    color: "#4F4F4F",
    marginBottom: 6,
    width: 240,
    textAlign: "center",
    lineHeight: "14.4px",
  },
  details: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 30,
    marginBottom: 26,
  },
  detailsView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 14,
  },
  detailsTitle: {
    fontSize: 12,
    lineHeight: "14.4px",
    fontWeight: "bold",
    width: 60,
  },
  detailsContent: {
    fontSize: 12,
    lineHeight: "14.4px",
    fontWeight: 400,
  },
  table: {
    width: "100%",
    paddingRight: 30,
    marginBottom: 26,
  },
  tHead: {
    backgroundColor: "#0D7590",
    display: "flex",
    flexDirection: "row",
    padding: 16,
    color: "white",
  },
  tHead1: {
    flex: 1,
    fontSize: 12,
  },
  tHead2: {
    flex: 2,
    fontSize: 12,
  },
  tHead3: {
    flex: 4,
    fontSize: 12,
  },
  tHead4: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  tHead5: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  tHead6: {
    flex: 1.5,
    fontSize: 12,
    textAlign: "center",
  },
  tBody: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    color: "#4F4F4F",
  },
  tBody1: {
    flex: 1,
    fontSize: 12,
  },
  tBody2: {
    flex: 2,
    fontSize: 12,
  },
  tBody3: {
    flex: 4,
    fontSize: 12,
  },
  tBody4: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  tBody5: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
  tBody6: {
    flex: 1.5,
    fontSize: 12,
    textAlign: "center",
  },
  table2: {
    width: "75%",
    marginBottom: 16,
  },
  t2Head1: {
    flex: 1,
    fontSize: 12,
  },
  t2Head2: {
    flex: 1,
    fontSize: 12,
  },
  t2Head3: {
    flex: 1,
    fontSize: 12,
  },
  t2Head4: {
    flex: 1,
    fontSize: 12,
  },
  t2Head5: {
    flex: 1,
    fontSize: 12,
  },
  t2Head6: {
    flex: 0.6,
    fontSize: 12,
  },
  t2Body1: {
    flex: 1,
    fontSize: 12,
  },
  t2Body2: {
    flex: 1,
    fontSize: 12,
  },
  t2Body3: {
    flex: 1,
    fontSize: 12,
  },
  t2Body4: {
    flex: 1,
    fontSize: 12,
  },
  t2Body5: {
    flex: 1,
    fontSize: 12,
  },
  t2Body6: {
    flex: 0.6,
    fontSize: 12,
  },
  remark: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  remac: {
    fontSize: 12,
    fontWeight: "bold",
  },
  pass: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0D7590",
  },
  bottom: {
    height: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    gap: 10,
  },
  sign: {
    width: 200,
    height: 1,
    backgroundColor: "gray",
  },
  reg: {
    fontSize: 12,
    color: "#333",
  },
  tRowEven: { backgroundColor: "#F9F9F9" },
  tRowOdd: { backgroundColor: "#FFFFFF" },
});
export const ResultPDF = ({ data }: ResultPDFProps) => {
  if (!data || !data.data) return <Document />;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View wrap={false} style={styles.header}>
          <Image
            style={styles.logo}
            src="https://res.cloudinary.com/omniswift/image/upload/v1648473802/wqouqp73otvvjmkkekkj.png"
          />
          <View style={styles.headings}>
            <Text style={styles.heading2}>FREMONT COLLEGE OF EDUCATION</Text>
            <Text style={styles.heading4}>
              No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.
            </Text>
            <Text style={styles.heading1}>
              Post Graduate Diploma in Education
            </Text>
            <Text style={styles.heading3}>
              Student First Semester Statement Of Result
            </Text>
          </View>
          <Image style={styles.picture} src={data.profile_picture} />
        </View>
        <View style={styles.details} wrap={false}>
          <View>
            <View style={styles.detailsView}>
              <Text style={styles.detailsTitle}>Name:</Text>
              <Text
                style={styles.detailsContent}
              >{`${data.data.surname} ${data.data.firstname}`}</Text>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.detailsTitle}>Level:</Text>
              <Text style={styles.detailsContent}>{data.data.level}</Text>
            </View>
          </View>
          <View>
            <View style={styles.detailsView}>
              <Text style={styles.detailsTitle}>Reg no:</Text>
              <Text style={styles.detailsContent}>{data.data["reg_no"]}</Text>
            </View>
            <View style={styles.detailsView}>
              <Text style={styles.detailsTitle}>Session:</Text>
              <Text style={styles.detailsContent}>{data.data.session}</Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tHead}>
            <Text style={styles.tHead1}>S/N</Text>
            <Text style={styles.tHead2}>Course Code</Text>
            <Text style={styles.tHead3}>Course Title</Text>
            <Text style={styles.tHead4}>Unit</Text>
            <Text style={styles.tHead5}>Grade</Text>
            <Text style={styles.tHead6}>Total Point</Text>
          </View>
          {data.data.result.map((res, index) => {
            return (
              <View
                style={[
                  styles.tBody,
                  index % 2 === 0 ? styles.tRowEven : styles.tRowOdd,
                ]}
                key={index}
              >
                <Text style={styles.tBody1}>{index + 1}</Text>
                <Text style={styles.tBody2}>{res.coursecode}</Text>
                <Text style={styles.tBody3}>{res.title}</Text>
                <Text style={styles.tBody4}>{res["credit_unit"]}</Text>
                <Text style={styles.tBody5}>{res.grade}</Text>
                <Text style={styles.tBody6}>{res["total_point"]}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.table2}>
          <View style={styles.tHead}>
            <Text style={styles.t2Head1}>UNTS</Text>
            <Text style={styles.t2Head2}>UNTD</Text>
            <Text style={styles.t2Head3}>GPTS</Text>
            <Text style={styles.t2Head4}>GPTD</Text>
            <Text style={styles.t2Head5}>GPATS</Text>
            <Text style={styles.t2Head6}>GPATD</Text>
          </View>
          <View style={[styles.tBody, styles.tRowEven]}>
            <Text style={styles.t2Body1}>{data.data.cummulative.unts}</Text>
            <Text style={styles.t2Body2}>{data.data.cummulative.untd}</Text>
            <Text style={styles.t2Body3}>{data.data.cummulative.gpts}</Text>
            <Text style={styles.t2Body4}>{data.data.cummulative.gptd}</Text>
            <Text style={styles.t2Body5}>{data.data.cummulative.gpats}</Text>
            <Text style={styles.t2Body6}>{data.data.cummulative.gpatd}</Text>
          </View>
        </View>
        <View style={styles.remark}>
          <Text style={styles.remac}>Remark:</Text>
          <Text style={styles.pass}>{data.data.cummulative.remarks}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.sign}></View>
          <Text style={styles.reg}>Registrar</Text>
        </View>
      </Page>
    </Document>
  );
};
