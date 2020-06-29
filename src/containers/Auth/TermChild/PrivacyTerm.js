import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Container, Body, Content, Footer, Header } from 'native-base';
import HeaderBase from '../../../components/HeaderBase';
import Config from '../../../config';
import Images from '../../../assets/images';
const { width, height } = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header style={Config.Styles.headerGray}>
          <HeaderBase
            backGray
            navigation={this.props.navigation}
            title={'개인정보 수집 동의'}
          />
        </Header>
        <Body>
          <Content showsVerticalScrollIndicator={false}>
            <View style={{ width: width - 40, paddingVertical: 20 }}>
              <Text style={styles.textStyle1}>
                (주)미니스쿨(이하, "회사")은 개인정보보호법에 따라 이용자의
                개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의
                고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고
                있습니다. 회사는 개인정보처리방침을 개정하는 경우 웹사이트
                공지사항(또는 개별공지)을 통하여 공지할 것입니다.
              </Text>
              <Text style={styles.textStyle2}>1. 개인정보의 처리 목적</Text>
              <Text style={styles.textStyle1}>
                회사는 개인정보를 다음의 목적을 위해 처리합니다. 처리한
                개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용
                목적이 변경될 시에는 사전동의를 구할 예정입니다.
              </Text>
              <Text style={styles.textStyle2}>
                1) 홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스
                제공에 따른 본인 식별 및 인증, 회원자격 유지 및 관리, 서비스
                부정이용 방지 등을 목적으로 개인정보를 처리합니다.
              </Text>
              <Text style={styles.textStyle1}>2) 재화 또는 서비스 제공</Text>
              <Text style={styles.textStyle1}>
                물품배송, 서비스 제공, 콘텐츠 제공 등을 목적으로 개인정보를
                처리합니다.
              </Text>
              <Text style={styles.textStyle1}>3) 마케팅 및 광고 활용</Text>
              <Text style={styles.textStyle1}>
                신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성
                정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공
                및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의
                서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
              </Text>
              <Text style={styles.textStyle2}>2. 개인정보처리 위탁</Text>
              <Text style={styles.textStyle1}>
                1) 회사는 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무
                수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁
                제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을
                계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
                처리하는지를 감독하고 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2) 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본
                개인정보 처리방침을 통하여 공개하도록 하겠습니다.
              </Text>
              <Text style={styles.textStyle1}>
                3. 정보주체의 권리, 의무 및 그 행사방법 이용자는
                개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                1) 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호
                관련 권리를 행사할 수 있습니다.
              </Text>
              <Text style={styles.textStyle1}>(1) 개인정보 열람요구</Text>
              <Text style={styles.textStyle1}>
                (2) 오류 등이 있을 경우 정정 요구
              </Text>
              <Text style={styles.textStyle1}>(3) 삭제요구</Text>
              <Text style={styles.textStyle1}>(4) 처리정지 요구</Text>
              <Text style={styles.textStyle1}>
                2) 제1항에 따른 권리 행사는 회사에 대해 개인정보 보호법 시행규칙
                별지 제8호 서식에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여
                하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
              </Text>
              <Text style={styles.textStyle1}>
                3) 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
                경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를
                이용하거나 제공하지 않습니다.
              </Text>
              <Text style={styles.textStyle1}>
                4) 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을
                받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보
                보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야
                합니다.
              </Text>
              <Text style={styles.textStyle1}>
                4. 처리하는 개인정보의 항목 작성
              </Text>
              <Text style={styles.textStyle1}>
                회사는 다음의 개인정보 항목을 처리하고 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                1) 회원가입 시 회원식별 및 최적화된 서비스 제공을 위해 아래와
                같은 정보를 수집합니다.
              </Text>
              <Text style={styles.textStyle1}>[필수]</Text>
              <Text style={styles.textStyle1}>
                - 아이디(회원이 실제 이용 중인 이메일 주소)
              </Text>
              <Text style={styles.textStyle1}>- 비밀번호</Text>
              <Text style={styles.textStyle1}>- 이름</Text>
              <Text style={styles.textStyle1}>- 휴대폰 번호</Text>
              <Text style={styles.textStyle1}>- 서비스 알림 수신 방법</Text>
              <Text style={styles.textStyle1}>- 이용약관 동의 여부</Text>
              <Text style={styles.textStyle1}>
                - 개인정보 수집 및 이용에 대한 안내 확인 여부
              </Text>
              <Text style={styles.textStyle2}>[선택]</Text>
              <Text style={styles.textStyle1}>
                - 마케팅 정보 수집 및 활용 동의 여부
              </Text>
              <Text style={styles.textStyle1}>- 주소</Text>
              <Text style={styles.textStyle2}>
                2) 서비스 이용 간 목적에 따라 아래와 같은 정보가 수집될 수
                있습니다.
              </Text>
              <Text style={styles.textStyle1}>[결제/환불]</Text>
              <Text style={styles.textStyle1}>- 자녀 정보</Text>
              <Text style={styles.textStyle1}>> 이름</Text>
              <Text style={styles.textStyle1}>> 성별</Text>
              <Text style={styles.textStyle1}>> 생년월일</Text>
              <Text style={styles.textStyle1}>- 이름</Text>
              <Text style={styles.textStyle1}>- 이메일 주소</Text>
              <Text style={styles.textStyle1}>- 휴대폰 번호/통신사</Text>
              <Text style={styles.textStyle1}>- 결제승인번호</Text>
              <Text style={styles.textStyle1}>
                - 신용카드 결제 시 관련 필수 정보
              </Text>
              <Text style={styles.textStyle1}>- 계좌정보</Text>
              <Text style={styles.textStyle2}>[배송]</Text>
              <Text style={styles.textStyle1}>- 배송 상품 정보</Text>
              <Text style={styles.textStyle1}>- 수신인 이름</Text>
              <Text style={styles.textStyle1}>- 배송지 주소</Text>
              <Text style={styles.textStyle1}>- 휴대폰 번호</Text>
              <Text style={styles.textStyle1}>[이벤트 참여]</Text>
              <Text style={styles.textStyle1}>- 이름</Text>
              <Text style={styles.textStyle1}>- 이메일 주소</Text>
              <Text style={styles.textStyle1}>- 휴대폰 번호</Text>
              <Text style={styles.textStyle1}>- 주소</Text>
              <Text style={styles.textStyle1}>[자동 수집 항목]</Text>
              <Text style={styles.textStyle1}>- IP 주소</Text>
              <Text style={styles.textStyle1}>
                - 웹브라우저에서 생성된 Cookie 값
              </Text>
              <Text style={styles.textStyle1}>- 서비스 이용 기록</Text>
              <Text style={styles.textStyle1}>[수업]</Text>
              <Text style={styles.textStyle1}>- 회원의 수업 녹화 영상</Text>
              <Text style={styles.textStyle1}>5. 개인정보의 파기</Text>
              <Text style={styles.textStyle1}>
                회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이
                해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과
                같습니다.
              </Text>
              <Text style={styles.textStyle1}>1) 파기절차</Text>
              <Text style={styles.textStyle1}>
                이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의
                경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간
                저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는
                법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.
              </Text>
              <Text style={styles.textStyle1}>2) 파기기한</Text>
              <Text style={styles.textStyle1}>
                이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는
                보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성,
                해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게
                되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는
                날로부터 5일 이내에 그 개인정보를 파기합니다.
              </Text>
              <Text style={styles.textStyle1}>
                6. 개인정보의 안전성 확보 조치
              </Text>
              <Text style={styles.textStyle1}>
                회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에
                필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                1) 개인정보 취급 직원의 최소화 및 교육 개인정보를 취급하는
                직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를
                관리하는 대책을 시행하고 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                2) 개인정보의 암호화 이용자의 개인정보는 비밀번호는 암호화 되어
                저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는
                파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는
                등의 별도 보안기능을 사용하고 있습니다.
              </Text>
              <Text style={styles.textStyle1}>
                3) 개인정보에 대한 접근 제한 개인정보를 처리하는
                데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여
                개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며
                침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고
                있습니다.
              </Text>
              <Text style={styles.textStyle2}>7. 개인정보 보호책임자 작성</Text>
              <Text style={styles.textStyle1}>
                1) 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </Text>
              <Text style={styles.textStyle1}>[개인정보 보호책임자]</Text>
              <Text style={styles.textStyle1}>- 성명: 김대길</Text>
              <Text style={styles.textStyle1}>- 직책: 팀장</Text>
              <Text style={styles.textStyle1}>- 직급: 이사</Text>
              <Text style={styles.textStyle1}>
                - 연락처: 02-2135-7762 (e-mail: infra@minischool.co.kr)
              </Text>
              <Text style={styles.textStyle1}>
                2) 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한
                모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한
                사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는
                정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
              </Text>
              <Text style={styles.textStyle1}>8. 개인정보 처리방침 변경</Text>
              <Text style={styles.textStyle1}>
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
                변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행
                7일 전부터 공지사항을 통하여 고지할 것입니다.
              </Text>
              <Text style={styles.textStyle1}>{'<부칙>'}</Text>
              <Text style={styles.textStyle1}>
                1. (시행일) 개정된 본 개인정보 처리방침은 2018년 12월 00일부터
                적용됩니다.
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
    fontFamily: 'Mono-Regular',
  },
  textStyle2: {
    color: '#555555',
    fontSize: 17,
    marginTop: 15,
    fontFamily: 'Mono-Regular',
  },
});
