import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Container, Body, Content, Footer, Header} from 'native-base';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import Images from '../../../assets/images';
const {width, height} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header style={Config.Styles.header}>
          <HeaderBase
            navigation={this.props.navigation}
            title={'서비스 이용 약관 동의'}
          />
        </Header>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View style={{width: width - 40, paddingVertical: 20}}>
              <Text style={styles.textStyle1}>이용약관</Text>
              <Text style={styles.textStyle2}>제1장 총칙</Text>
              <Text style={styles.textStyle2}>제1조 (목적)</Text>
              <Text style={styles.textStyle2}>
                이 약관은 (주)미니스쿨(이하 “회사”)이 온라인으로 제공하는 캐릭터
                화상교육 서비스 및 이에 부수된 제반 서비스(이하 “미니스쿨
                서비스”)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및
                책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </Text>
              <Text style={styles.textStyle2}>제2조 (용어의 정의)</Text>
              <Text style={styles.textStyle2}>
                1. 이 약관에서 사용하는 정의는 다음과 같습니다.
              </Text>
              <Text style={styles.textStyle2}>
                1) "회사"라 함은 (주)미니스쿨을 의미합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2) "회원"이라 함은 본 약관에 동의하고 회사가 제공하는 서비스의
                이용 자격을 부여받은 자를 의미합니다.
              </Text>
              <Text style={styles.textStyle1}>
                3) "미니스쿨 서비스"라 함은 회사가 회원에게 온라인으로 제공하는
                캐릭터 화상교육 서비스 및 이에 부수된 제반 서비스를 의미합니다.
              </Text>
              <Text style={styles.textStyle1}>
                4) "계정(ID)"이라 함은 회원의 식별과 미니스쿨 서비스 이용을
                위하여 회원이 선정하고 회사가 부여하는 문자, 숫자 또는
                특수문자의 조합을 의미합니다.
              </Text>
              <Text style={styles.textStyle1}>
                5) "계정정보"라 함은 회원의 계정, 비밀번호, 성명 등 회원이
                회사에 제공한 일반정보 및 서비스 이용정보, 이용요금 결제상태 등
                생성정보를 통칭합니다.
              </Text>
              <Text style={styles.textStyle1}>
                6) "비밀번호"라 함은 회원이 부여받은 계정과 일치되는 회원임을
                확인하고 회원의 정보 및 권익보호를 위해 회원 자신이 선정하여
                비밀로 관리하는 문자, 숫자 또는 특수문자의 조합을 의미합니다.
              </Text>
              <Text style={styles.textStyle1}>
                7) "게시물"이라 함은 회원이 서비스를 이용함에 있어 회원이 게시한
                문자, 문서, 그림, 음성, 영상 또는 이들의 조합으로 이루어진 모든
                정보를 말합니다.
              </Text>
              <Text style={styles.textStyle1}>
                8) "다시 보기 영상"이란 "회원"이 학습 내용을 다시 볼 수 있도록
                수업 내용을 녹화하여 "회원"에게 제공되는 "영상"을 말합니다.
              </Text>
              <Text style={styles.textStyle2}>
                2. 이 약관에서 사용하는 용어의 정의는 제1항 각호에서 정하는 것을
                제외하고는 관계법령 및 기타 일반적인 상관례에 의합니다.
              </Text>
              <Text style={styles.textStyle2}>제3조 (회사정보 등의 제공)</Text>
              <Text style={styles.textStyle2}>
                회사는 다음 각 호의 사항을 미니스쿨 서비스 초기화면이나 미니스쿨
                서비스 홈페이지(www.minischool.co.kr)에 게시하여, 회원이 이를
                쉽게 알 수 있도록 합니다. 다만, 개인정보취급방침과 약관은 회원이
                연결화면을 통하여 볼 수 있도록 할 수 있습니다.
              </Text>
              <Text style={styles.textStyle2}>1) 상호 및 대표자의 성명</Text>
              <Text style={styles.textStyle1}>
                2) 영업소 소재지 주소(회원의 불만을 처리할 수 있는 곳의 주소를
                포함한다) 및 전자우편주소
              </Text>
              <Text style={styles.textStyle1}>
                3) 전화번호, 모사전송번호(Fax 번호)
              </Text>
              <Text style={styles.textStyle1}>
                4) 사업자등록번호, 통신판매업 신고번호
              </Text>
              <Text style={styles.textStyle1}>5) 개인정보처리방침</Text>
              <Text style={styles.textStyle1}>6) 이용약관</Text>
              <Text style={styles.textStyle1}>제4조 (약관의 명시와 개정)</Text>
              <Text style={styles.textStyle2}>
                1. 회사는 이 약관의 내용을 회원이 알 수 있도록 서비스 초기
                화면이나 미니스쿨 서비스 홈페이지(www.minischool.co.kr)에
                게시하거나 연결화면을 제공하는 방법으로 회원에게 공지합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사는 회원이 회사와 이 약관의 내용에 관하여 질의 및 응답을
                할 수 있도록 조치를 취합니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사는 미니스쿨 서비스를 이용하고자 하는 자(이하 “이용자”라
                한다)가 약관의 내용을 쉽게 알 수 있도록 작성하고 약관에
                동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회,
                과오납금의 환급, 계약 해제ㆍ해지, 회사의 면책사항 및 회원에 대한
                피해보상 등과 같은 중요한 내용을 회원이 쉽게 이해할 수 있도록
                굵은 글씨 등으로 처리하거나 별도의 연결화면 또는 팝업화면 등을
                제공하고 이용자의 동의를 얻도록 합니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」,
                「약관의 규제에 관한 법률」, 「정보통신망이용촉진 및 정보보호
                등에 관한 법률」, 「콘텐츠산업진흥법」 등 관련 법령에 위배하지
                않는 범위에서 이 약관을 개정할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                5. 회사가 약관을 개정할 경우에는 적용일자 및 개정내용, 개정사유
                등을 명시하여 그 적용일자로부터 최소한 7일 이전(회원에게
                불리하거나 중대한 사항의 변경은 30일 이전)부터 그 적용일자 경과
                후 상당한 기간이 경과할 때까지 초기화면 또는 초기화면과의
                연결화면을 통해 공지합니다.
              </Text>
              <Text style={styles.textStyle1}>
                6. 회사가 약관을 개정할 경우에는 개정약관 공지 후 개정약관의
                적용에 대한 회원의 동의 여부를 확인합니다. 개정약관 공지시
                회원이 동의 또는 거부의 의사표시를 하지 않으면 승낙한 것으로
                간주하겠다는 내용도 함께 공지한 경우에는 회원이 약관 시행일 까지
                거부의사를 표시하지 않는다면 개정약관에 동의한 것으로 간주할 수
                있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                7. 회원이 개정약관의 적용에 동의하지 않는 경우 회사 또는 회원은
                미니스쿨 서비스 이용계약을 해지할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>제5조 (약관 외 준칙)</Text>
              <Text style={styles.textStyle1}>
                이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는
                「전자상거래 등에서의 소비자보호에 관한 법률」,「약관의 규제에
                관한 법률」,「정보통신망이용촉진 및 정보보호 등에 관한
                법률」,「콘텐츠산업진흥법」 등 관련 법령에 따릅니다.
              </Text>
              <Text style={styles.textStyle1}>제6조 (운영정책)</Text>
              <Text style={styles.textStyle2}>
                1. 약관을 적용하기 위하여 필요한 사항과 회원의 권익을 보호하고
                서비스세계 내 질서를 유지하기 위하여 회사는 약관에서 구체적
                범위를 정하여 위임한 사항을 미니스쿨 서비스 운영정책(이하
                “운영정책”이라 합니다)으로 정할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사는 운영정책의 내용을 회원이 알 수 있도록 서비스 초기
                화면이나 미니스쿨 서비스 홈페이지에 게시하거나 연결화면을
                제공하는 방법으로 회원에게 공지하여야 합니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회원의 권리 또는 의무에 중대한 변경을 가져오거나 약관 내용을
                변경하는 것과 동일한 효력이 발생하는 운영정책 개정의 경우에는
                제4조의 절차에 따릅니다. 단, 운영정책 개정이 다음 각 호의 어느
                하나에 해당하는 경우에는 제2항의 방법으로 사전에 공지합니다.
              </Text>
              <Text style={styles.textStyle2}>
                1) 약관에서 구체적으로 범위를 정하여 위임한 사항을 개정하는 경우
              </Text>
              <Text style={styles.textStyle1}>
                2) 회원의 권리·의무와 관련 없는 사항을 개정하는 경우
              </Text>
              <Text style={styles.textStyle1}>
                3) 운영정책의 내용이 약관에서 정한 내용과 근본적으로 다르지 않고
                회원이 예측가능한 범위내에서 운영정책을 개정하는 경우
              </Text>
              <Text style={styles.textStyle1}>제2장 이용계약의 체결</Text>
              <Text style={styles.textStyle2}>제7조 (이용신청 및 방법)</Text>
              <Text style={styles.textStyle2}>
                ① 회사가 제공하는 미니스쿨 서비스를 이용하고자 하는 자는 회사가
                서비스 초기 화면이나 미니스쿨 서비스
                홈페이지(www.minischool.co.kr)에서 제공하는 이용신청서를
                작성하는 방법으로 이용신청을 하여야 합니다.
              </Text>
              <Text style={styles.textStyle1}>
                ② 이용자는 이용신청시 회사에서 요구하는 제반 정보를 제공하여야
                합니다.
              </Text>
              <Text style={styles.textStyle1}>
                ③ 이용자는 제1항의 이용 신청 시 본인의 실명 및 실제 정보를
                기재하여야 합니다. 실명 또는 식별정보를 허위로 기재하거나 타인의
                명의를 도용한 경우 이 약관에 의한 회원의 권리를 주장할 수 없고,
                회사는 환급없이 이용계약을 취소하거나 해지할 수 있습니다.
              </Text>
              <Text style={styles.textStyle2}>
                제8조 (이용신청의 승낙과 제한)
              </Text>
              <Text style={styles.textStyle2}>
                1. 회사는 회사가 이용자에게 요구하는 정보에 대해 이용자가 실명
                및 실제 정보를 정확히 기재하여 이용신청을 한 경우에 상당한
                이유가 없는 한 이용신청을 승낙합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사는 다음 각 호의 어느 하나에 해당하는 이용신청에 대해서는
                승낙을 하지 않을 수 있습니다.
              </Text>
              <Text style={styles.textStyle2}>
                1) 제7조에 위반하여 이용신청을 하는 경우
              </Text>
              <Text style={styles.textStyle1}>
                2) 이용요금을 납부하지 않거나 잘못 납부하여 확인할 수 없는 경우
              </Text>
              <Text style={styles.textStyle1}>
                3) 최근 3개월 내 이용제한 기록이 있는 이용자가 이용신청을 하는
                경우
              </Text>
              <Text style={styles.textStyle1}>
                4) 제3자의 신용카드, 유/무선 전화, 은행 계좌 등을 무단으로 이용
                또는 도용하여 서비스 이용요금을 결제하는 경우
              </Text>
              <Text style={styles.textStyle1}>
                5) 대한민국 이외의 국가 중 회사에서 아직 서비스를 제공할 것으로
                결정하지 않은 국가에서 서비스를 이용하는 경우로 회사가 해외
                서비스 업체와 체결한 계약이나 특정 국가에서 접속하는 회원에 대한
                서비스 제공과 관련하여 서비스제공을 제한할 필요가 있는 경우
              </Text>
              <Text style={styles.textStyle1}>
                6) 「서비스산업진흥에 관한 법률」, 「정보통신망 이용촉진 및
                정보보호 등에 관한 법률」 및 그 밖의 관계 법령에서 금지하는
                위법행위를 할 목적으로 이용신청을 하는 경우
              </Text>
              <Text style={styles.textStyle1}>
                7) 그 밖에 1호 내지 7호에 준하는 사유로서 승낙이 부적절하다고
                판단되는 경우
              </Text>
              <Text style={styles.textStyle2}>
                3. 회사는 다음 각 호의 어느 하나에 해당하는 경우에는 그 사유가
                해소될 때까지 승낙을 유보할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                1) 회사의 설비에 여유가 없거나 기술적 장애가 있는 경우
              </Text>
              <Text style={styles.textStyle1}>
                2) 서비스 상의 장애 또는 서비스 이용요금 결제수단의 장애가
                발생한 경우
              </Text>
              <Text style={styles.textStyle1}>
                3) 그 밖에 위 각 호에 준하는 사유로서 이용신청의 승낙이 곤란한
                경우
              </Text>
              <Text style={styles.textStyle2}>
                제9조 (회원 계정(ID) 및 비밀번호)
              </Text>
              <Text style={styles.textStyle2}>
                1. 회사는 회원에 대하여 회원의 정보 보호, 서비스 이용안내 등의
                편의를 위해 회원이 선정한 일정한 문자, 숫자 또는 특수문자의
                조합을 계정으로 부여합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사는 계정정보를 통하여 당해 회원의 서비스 이용가능 여부
                등의 제반 회원 관리업무를 수행합니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회원은 자신의 계정정보를 선량한 관리자로서의 주의 의무를
                다하여 관리하여야 합니다. 회원이 본인의 계정정보를 소홀히
                관리하거나 제3자에게 이용을 승낙함으로써 발생하는 손해에
                대하여는 회원에게 책임이 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 비밀번호의 관리책임은 회원에게 있으며, 회원이 원하는 경우에는
                보안상의 이유 등으로 언제든지 변경이 가능합니다.
              </Text>
              <Text style={styles.textStyle1}>
                5. 회원은 정기적으로 비밀번호를 변경하여야 합니다.
              </Text>
              <Text style={styles.textStyle2}>
                제10조 (회원 정보의 제공 및 변경)
              </Text>
              <Text style={styles.textStyle2}>
                1. 회원은 이 약관에 의하여 회사에 정보를 제공하여야 하는
                경우에는 진실된 정보를 제공하여야 하며, 허위정보 제공으로 인해
                발생한 불이익에 대해서는 보호받지 못합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회원은 개인정보관리화면을 통하여 언제든지 자신의 개인정보를
                열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한
                실명, 계정(ID) 등은 수정이 불가능합니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회원은 회원가입 신청 시 기재한 사항이 변경되었을 경우
                온라인으로 수정을 하거나 기타 방법으로 회사에 대하여 그
                변경사항을 알려야 합니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 제2항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여
                회사는 책임을 지지 않습니다.
              </Text>
              <Text style={styles.textStyle2}>
                제11조 (개인정보의 보호 및 관리)
              </Text>
              <Text style={styles.textStyle2}>
                1. 회사는 관계 법령이 정하는 바에 따라 계정정보를 포함한 회원의
                개인정보를 보호하기 위해 노력합니다. 회원 개인정보의 보호 및
                사용에 대해서는 관계법령 및 회사가 별도로 고지하는
                개인정보취급방침이 적용됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 서비스의 일부로 제공되는 개별 서비스를 제외한 것으로서
                홈페이지 및 미니스쿨 서비스별 웹사이트에서 단순히 링크된 제3자
                제공의 서비스에 대하여는 회사의 개인정보취급방침이 적용되지
                않습니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사는 회원의 귀책사유로 인하여 노출된 회원의 계정정보를
                포함한 모든 정보에 대해서 일체의 책임을 지지 않습니다.
              </Text>
              <Text style={styles.textStyle2}>제3장 계약 당사자의 의무</Text>
              <Text style={styles.textStyle2}>제12조 (회사의 의무)</Text>
              <Text style={styles.textStyle2}>
                1. 회사는 관련 법령을 준수하고, 이 약관이 정하는 권리의 행사와
                의무의 이행을 신의에 따라 성실하게 합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사는 회원이 안전하게 서비스를 이용할 수 있도록
                개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며
                개인정보취급방침을 공시하고 준수합니다. 회사는 이 약관 및
                개인정보취급방침에서 정한 경우를 제외하고는 회원의 개인정보가
                제3자에게 공개 또는 제공되지 않도록 합니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사는 계속적이고 안정적인 서비스의 제공을 위하여 서비스
                개선을 하던 중 설비에 장애가 생기거나 데이터 등이 멸실된 때에는
                천재지변, 비상사태, 현재의 기술로는 해결이 불가능한 결함 및 장애
                등 부득이한 사유가 없는 한 지체 없이 이를 수리 또는 복구하도록
                최선의 노력을 다합니다.
              </Text>
              <Text style={styles.textStyle2}>제13조 (회원의 의무)</Text>
              <Text style={styles.textStyle2}>
                1. 회원은 다음 행위를 하여서는 안 됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                1) 신청 또는 변경 시 허위내용의 기재
              </Text>
              <Text style={styles.textStyle1}>2) 타인의 정보도용</Text>
              <Text style={styles.textStyle1}>
                3) 회사의 임직원, 운영자, 기타 관계자를 사칭하는 행위
              </Text>
              <Text style={styles.textStyle1}>
                4) 회사가 게시한 정보의 변경
              </Text>
              <Text style={styles.textStyle1}>
                5) 회사가 금지한 정보(컴퓨터 프로그램 등)의 송신 또는 게시
              </Text>
              <Text style={styles.textStyle1}>
                6) 회사가 제공 또는 승인하지 아니한 컴퓨터 프로그램이나 기기
                또는 장치를 제작, 배포, 이용, 광고하는 행위
              </Text>
              <Text style={styles.textStyle1}>
                7) 회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해
              </Text>
              <Text style={styles.textStyle1}>
                8) 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
              </Text>
              <Text style={styles.textStyle1}>
                9) 외설 또는 폭력적인 말이나 글, 화상, 음향, 기타 공서양속에
                반하는 정보를 공개 또는 게시하는 행위
              </Text>
              <Text style={styles.textStyle1}>
                10) 서비스 데이터(계정, 캐릭터, 서비스아이템 등)를 유상으로
                처분(양도, 매매 등)하거나 권리의 객체(담보제공, 대여 등)로 하는
                행위
              </Text>
              <Text style={styles.textStyle1}>
                11) 10호의 행위를 유도하거나 광고하는 행위
              </Text>
              <Text style={styles.textStyle1}>
                12) 회사의 동의 없이 영리, 영업, 광고, 정치활동 등을 목적으로
                미니스쿨 서비스를 사용하는 행위
              </Text>
              <Text style={styles.textStyle1}>
                13) 기타 관련 법령에서 금지하거나 선량한 풍속 기타 사회통념상
                허용되지 않는 행위
              </Text>
              <Text style={styles.textStyle1}>
                2. 회원은 이 약관의 규정, 이용안내 및 미니스쿨 서비스와 관련하여
                공지한 주의사항, 회사가 통지하는 사항 등을 확인하고 준수할
                의무가 있습니다.
              </Text>
              <Text style={styles.textStyle1}>제4장 서비스 이용</Text>
              <Text style={styles.textStyle2}>
                제14조 (서비스의 변경 및 내용수정)
              </Text>
              <Text style={styles.textStyle2}>
                1. 회원은 회사가 제공하는 미니스쿨 서비스를 이 약관, 운영정책 및
                회사가 설정한 서비스규칙에 따라 이용할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사가 미니스쿨 서비스를 통하여 회원에게 제공하는 교육
                콘텐츠는 회사의 소유물로서 회사는 콘텐츠 내용의 제작, 변경,
                유지, 보수에 관한 포괄적인 권한을 가집니다.
              </Text>
              <Text style={styles.textStyle1}>
                제15조 (서비스의 제공 및 중단 등)
              </Text>
              <Text style={styles.textStyle2}>
                1. 미니스쿨 서비스는 회사의 영업방침에 따라 정해진 시간동안
                제공합니다. 회사는 미니스쿨 서비스 제공시간을 서비스
                초기화면이나 미니스쿨 서비스 홈페이지(www.minischool.co.kr)에
                적절한 방법으로 안내합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 제1항에도 불구하고, 다음 각 호의 어느 하나에 해당하는
                경우에는 일정한 시간동안 미니스쿨 서비스가 제공되지 아니할 수
                있으며, 해당 시간 동안 회사는 미니스쿨 서비스를 제공할 의무가
                없습니다.
              </Text>
              <Text style={styles.textStyle2}>
                1) 컴퓨터 등 정보통신설비의 보수점검, 교체, 정기점검 또는 서비스
                내용이나 미니스쿨 서비스의 수정을 위하여 필요한 경우
              </Text>
              <Text style={styles.textStyle1}>
                2) 해킹 등의 전자적 침해사고, 통신사고, 회원들의 비정상적인
                서비스 이용행태, 미처 예상하지 못한 미니스쿨 서비스의 불안정성에
                대응하기 위하여 필요한 경우
              </Text>
              <Text style={styles.textStyle1}>
                3) 관련 법령에서 특정 시간 또는 방법으로 미니스쿨 서비스 제공을
                금지하는 경우
              </Text>
              <Text style={styles.textStyle1}>
                4) 천재지변, 비상사태, 정전, 서비스 설비의 장애 또는 서비스
                이용의 폭주 등으로 정상적인 미니스쿨 서비스 제공이 불가능할 경우
              </Text>
              <Text style={styles.textStyle1}>
                5) 회사의 분할, 합병, 영업양도, 영업의 폐지, 당해 미니스쿨
                서비스의 수익 악화 등 회사의 경영상 중대한 필요에 의한 경우
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사는 제2항 제1호의 경우, 매주 또는 격주 단위로 일정 시간을
                정하여 미니스쿨 서비스를 중지할 수 있습니다. 이 경우 회사는
                최소한 24시간 전에 그 사실을 회원에게 서비스 초기 화면이나
                미니스쿨 서비스 홈페이지(www.minischool.co.kr)에 고지합니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 제2항 제2호의 경우, 회사는 사전 고지 없이 미니스쿨 서비스를
                일시 중지할 수 있습니다. 회사는 이러한 경우 그 사실을 서비스
                초기 화면이나 미니스쿨 서비스 홈페이지(www.minischool.co.kr)에
                사후 고지할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                5. 회사는 회사가 제공하는 무료서비스 이용과 관련하여 이용자에게
                발생한 어떠한 손해에 대해서도 책임을 지지 않습니다. 다만, 회사의
                고의 또는 중대한 과실로 인하여 발생한 손해의 경우는 제외합니다.
              </Text>
              <Text style={styles.textStyle1}>
                6. 제2항 제3호 내지 제5호의 경우에 회사는 기술상․운영상 필요에
                의해 미니스쿨 서비스 전부를 중단할 수 있으며, 30일전에
                홈페이지에 이를 공지하고 미니스쿨 서비스의 제공을 중단할 수
                있습니다. 사전에 통지할 수 없는 부득이한 사정이 있는 경우는
                사후에 통지를 할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>제16조 (저작권 등의 귀속)</Text>
              <Text style={styles.textStyle2}>
                1. 미니스쿨 서비스 내 회사가 제작한 콘텐츠에 대한 저작권 기타
                지적재산권은 회사의 소유입니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회원은 회사가 제공하는 미니스쿨 서비스를 이용함으로써 얻은
                정보 중 회사 또는 제공업체에 지적재산권이 귀속된 정보를 회사
                또는 제공업체의 사전승낙 없이 복제, 전송, 출판, 배포, 방송 기타
                방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게
                하여서는 안 됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사가 운영하는 게시판 등에 게시된 정보로 인하여 법률상
                이익이 침해된 회원은 회사에게 당해 정보의 삭제 또는 반박내용의
                게재를 요청할 수 있습니다. 이 경우 회사는 신속하게 필요한 조치를
                취하고, 이를 신청인에게 통지합니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. "회원"에게 제공되는 "서비스" 내의 "다시 보기 영상"의 저작권은
                "회사"에게 귀속되며, 저작권법에 의해 보호를 받습니다.
              </Text>
              <Text style={styles.textStyle1}>
                5. "회원"에게 제공되는 "서비스" 내의 "다시 보기 영상"은 개인정보
                처리방침에 의거하여 "회원" 본인에게만 제공됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                6. "회원"에게 제공된 "서비스" 내에 "다시 보기 영상"은 필요한
                범위 내에서는 일부 수정, 복제, 편집되어 관련 프로모션 등에
                노출될 수 있으며 이 경우 "회사"는 저작권법 규정을 준수하며
                "회사"는 언제든지 온라인을 통해 해당 게시물에 대해 삭제, 검색
                결과 제외, 비공개 등의 조치를 취할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                제5장 청약철회, 계약 해제·해지 및 이용제한
              </Text>
              <Text style={styles.textStyle2}>제17조 (청약의 철회)</Text>
              <Text style={styles.textStyle2}>
                1. 회사와 유료서비스 이용에 관한 계약을 체결한 회원은 구매일
                또는 유료서비스 이용가능일로부터 7일 이내에는 청약의 철회를 할
                수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회원은 다음 각 호의 어느 하나에 해당하는 경우에는 회사의
                의사에 반하여 제1항에 따른 청약철회 등을 할 수 없습니다.
              </Text>
              <Text style={styles.textStyle2}>
                1) 회원에게 책임이 있는 사유로 재화 등이 멸실되거나 훼손된 경우
              </Text>
              <Text style={styles.textStyle1}>
                2) 회원이 재화를 사용 또는 일부 소비한 경우
              </Text>
              <Text style={styles.textStyle1}>
                3) 시간이 지나 다시 판매하기 곤란할 경우
              </Text>
              <Text style={styles.textStyle1}>
                4) 복제가능한 재화 등의 포장을 훼손한 경우
              </Text>
              <Text style={styles.textStyle1}>
                5) 그 밖에 거래의 안전을 위하여 법령으로 정하는 경우
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사는 제2항 제2호부터 4호까지 규정에 따라 청약철회 등이
                불가능한 재화 등의 경우에는 그 사실을 재화 등의 포장이나 그밖에
                회원이 쉽게 알 수 있는 곳에 명확하게 적시하거나 시험 사용 상품을
                제공하는 등의 방법으로 청약철회 등의 권리 행사가 방해받지
                아니하도록 조치하여야 합니다. 만약 회사가 이러한 조치를 하지
                아니한 경우에는 제2항 제2호 내지 제4호의 청약철회 제한사유에도
                불구하고 회원은 청약철회를 할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 회원은 제1항 내지 제3항의 규정에도 불구하고 유료서비스의
                내용이 표시·광고 내용과 다르거나 계약내용과 다르게 이행된
                경우에는 구매일 또는 유료서비스 이용가능일로부터 3월 이내, 그
                사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약철회를 할
                수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                5. 회원은 구두 또는 서면(전자문서 포함), 전자우편으로 청약철회를
                할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>제18조(청약 철회 등의 효과)</Text>
              <Text style={styles.textStyle2}>
                1. 회원이 청약철회를 한 경우 회사는 지체없이 회원의 유료서비스를
                회수 또는 삭제하고 유료서비스를 회수 또는 삭제한 날로부터
                3영업일 이내에 지급받은 대금을 환급합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 이 경우 회사가 회원에게 환급을 지연한 때에는 그 지연기간에
                대하여 전자상거래 등에서의 소비자보호에 관한 법률 및 시행령에서
                정하는 이율을 곱하여 산정한 지연이자를 지급합니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사는 위 대금을 환급함에 있어서 회원이 신용카드나 그 밖에
                전자상거래 등에서의 소비자보호에 관한 법률 시행령으로 정하는
                결제수단으로 대금을 지급한 때에는 지체없이 당해 결제수단을
                제공한 사업자로 하여금 대금의 청구를 정지 또는 취소하도록
                요청합니다. 다만 회사가 결제업자로부터 이미 대금을 지급받은
                때에는 이를 결제업자에게 환불하고 이를 소비자에게 통지합니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 회사는 이미 재화 등이 일부 사용되거나 일부 소비된 경우에는 그
                재화 등의 일부 사용 또는 일부 소비에 의하여 회원이 얻은 이익
                또는 그 재화 등의 공급에 든 비용에 상당하는 금액을 회원에게
                청구할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                5. 회원이 청약철회를 한 경우 재화 등의 반환에 필요한 비용은
                회원이 부담하고, 회사는 회원에게 청약철회를 이유로 위약금 또는
                손해배상을 청구할 수 없습니다.
              </Text>
              <Text style={styles.textStyle1}>
                제19조 (회원의 해제 및 해지)
              </Text>
              <Text style={styles.textStyle2}>
                1. 회원은 미니스쿨 서비스 이용계약을 해지(이하 '회원탈퇴'라
                한다)할 수 있습니다. 회원이 회원탈퇴를 신청한 경우 회사는 회원
                본인 여부를 확인할 수 있으며, 해당 회원이 본인으로 확인되는
                경우에 회원의 신청에 따른 조치를 취합니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회원이 회원탈퇴를 원하는 경우에는 고객센터 및 서비스 내
                회원탈퇴 절차를 통하여 회원탈퇴를 할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                제20조 (회사의 해제 및 해지)
              </Text>
              <Text style={styles.textStyle2}>
                1. 회사는 회원이 이 약관에서 정한 회원의 의무를 위반한 경우에는
                회원에 대한 사전 통보 후 계약을 해지할 수 있습니다. 다만, 회원이
                현행법 위반 및 고의 또는 중대한 과실로 회사에 손해를 입힌
                경우에는 사전 통보 없이 이용계약을 해지할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사가 이용계약을 해지하는 경우 회사는 회원에게 서면,
                전자우편 또는 이에 준하는 방법으로 다음 각 호의 사항을 회원에게
                통보합니다.
              </Text>
              <Text style={styles.textStyle1}>1. 해지사유</Text>
              <Text style={styles.textStyle1}>2. 해지일</Text>
              <Text style={styles.textStyle1}>
                3. 제1항 단서의 경우, 회원은 유료서비스의 사용권한을 상실하고
                이로 인한 환불 및 손해배상을 청구할 수 없습니다.
              </Text>
              <Text style={styles.textStyle1}>제6장 손해배상 및 환불 등</Text>
              <Text style={styles.textStyle2}>제21조 (손해배상)</Text>
              <Text style={styles.textStyle1}>
                1. 회사가 고의 또는 중과실로 회원에게 손해를 끼친 경우, 손해에
                대하여 배상할 책임이 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회원이 본 약관을 위반하여 회사에 손해를 끼친 경우, 회원은
                회사에 대하여 그 손해에 대하여 배상할 책임이 있습니다.
              </Text>
              <Text style={styles.textStyle1}>제22조 (환불)</Text>
              <Text style={styles.textStyle2}>
                1. 현행법령 및 중대한 약관 위반 등 회원의 귀책사유로 이용계약을
                해지하는 경우 환불이 제한될 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>제23조 (회사의 면책)</Text>
              <Text style={styles.textStyle2}>
                1. 회사는 전시, 사변, 천재지변, 비상사태, 현재의 기술로는 해결이
                불가능한 기술적 결함 기타 불가항력적 사유로 서비스를 제공할 수
                없는 경우에는 책임이 면제됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사는 회원의 귀책사유로 인한 미니스쿨 서비스의 중지,
                이용장애 및 계약해지에 대하여 책임이 면제됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 회사는 기간통신 사업자가 전기통신서비스를 중지하거나
                정상적으로 제공하지 아니하여 회원에게 손해가 발생한 경우에
                대해서 회사의 고의 또는 중대한 과실이 없는 한 책임이 면제됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 회사는 사전에 공지된 미니스쿨 서비스용 설비의 보수, 교체,
                정기점검, 공사 등 부득이한 사유로 미니스쿨 서비스가 중지되거나
                장애가 발생한 경우에 대해서 회사의 고의 또는 중대한 과실이 없는
                한 책임이 면제됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                5. 회사는 회원의 컴퓨터 환경으로 인하여 발생하는 제반 문제 또는
                회사의 고의 또는 중대한 과실이 없는 네트워크 환경으로 인하여
                발생하는 문제에 대해서 책임이 면제됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                6. 회사는 회원 또는 제3자가 미니스쿨 서비스 내 또는 웹사이트
                상에 게시 또는 전송한 정보, 자료, 사실의 신뢰도, 정확성 등의
                내용에 대해서는 회사의 고의 또는 중대한 과실이 없는 한 책임이
                면제됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                7. 회사는 회원 상호간 또는 회원과 제3자간에 미니스쿨 서비스를
                매개로 발생한 분쟁에 대해 개입할 의무가 없으며 이로 인한 손해를
                배상할 책임도 없습니다.
              </Text>
              <Text style={styles.textStyle1}>
                8. 회사가 제공하는 미니스쿨 서비스 중 무료서비스의 경우에는
                회사의 고의 또는 중대한 과실이 없는 한 회사는 손해배상을 하지
                않습니다.
              </Text>
              <Text style={styles.textStyle1}>
                9. 본 미니스쿨 서비스 중 일부의 미니스쿨 서비스는 다른 사업자가
                제공하는 미니스쿨 서비스를 통하여 제공될 수 있으며, 회사는 다른
                사업자가 제공하는 미니스쿨 서비스로 인하여 발생한 손해 등에
                대해서는 회사의 고의 또는 중대한 과실이 없는 한 책임이
                면제됩니다.
              </Text>
              <Text style={styles.textStyle1}>
                10. 회사는 회원의 컴퓨터 오류에 의한 손해가 발생한 경우 또는
                신상정보 및 전자우편주소를 부정확하게 기재하거나 미기재하여
                손해가 발생한 경우에 대하여 회사의 고의 또는 중대한 과실이 없는
                한 책임이 면제됩니다.
              </Text>
              <Text style={styles.textStyle2}>제24조 (회원에 대한 통지)</Text>
              <Text style={styles.textStyle2}>
                1. 회사가 회원에게 통지를 하는 경우 회원이 지정한 전자우편주소,
                전자메모 등으로 할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2. 회사는 회원 전체에게 통지를 하는 경우 7일 이상 회사의
                웹사이트 공지사항 게시판에 게시하거나 팝업화면 등을 제시함으로써
                제1항의 통지에 갈음할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>제25조 (재판권 및 준거법)</Text>
              <Text style={styles.textStyle1}>
                본 약관은 대한민국 법률에 따라 규율되고 해석되며, 회사와
                회원간에 발생한 분쟁으로 소송이 제기되는 경우, 법령에 정한
                절차에 따른 법원을 관할 법원으로 합니다.
              </Text>
              <Text style={styles.textStyle2}>부칙</Text>
              <Text style={styles.textStyle2}>
                1. (시행일) 개정된 본 약관은 2018년 12월 00일부터 적용됩니다.
              </Text>
            </View>
          </Content>
        </Body>
      </Container>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  textStyle1: {
    color: '#555555',
    fontSize: 17,
    marginTop: 5,
  },
  textStyle2: {
    color: '#555555',
    fontSize: 17,
    marginTop: 15,
  },
});
