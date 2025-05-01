---
layout: post
title: "[클라우드 1주차] Ubuntu 22.04에서 VirtualBox 설치 및 네트워크 기초"
date: 2025-03-20 # 실제 스터디 날짜로 변경해주세요
categories: [Cloud, Virtualization, Study]
tags: [virtualbox, network, ubuntu, cloud, study, beginner]
comments: true
---

## 클라우드 스터디 1주차: VirtualBox 설치 및 네트워크 기초

클라우드 스터디 첫 주차에는 가상화 환경 구축의 기본이 되는 VirtualBox 설치와 다양한 네트워크 모드에 대해 학습했습니다. 또한 Ubuntu Server 22.04를 설치하고 기본적인 네트워크 설정을 진행하는 실습을 했습니다.

### 1. VirtualBox 설치 및 설정

- **VirtualBox 버전**: 7.1.6 (작성 시점 기준, 최신 버전 확인 권장)
- **설치 참고 자료**: [VirtualBox 공식 홈페이지](https://www.virtualbox.org/wiki/Downloads) 또는 [Phantom님 블로그](https://phantom.tistory.com/6)
- **확장 팩 설치**: VirtualBox 설치 후 [Extension Pack](https://www.virtualbox.org/wiki/Downloads)을 다운로드하여 설치하면 USB 2.0/3.0 지원, 디스크 암호화 등 유용한 추가 기능을 사용할 수 있습니다.
  - VirtualBox 실행 > `파일` > `도구` > `확장 팩 관리자` (단축키 Ctrl+T) > `설치` 버튼 클릭 후 다운로드한 확장 팩 파일 선택
  ![VirtualBox 확장 팩 관리자](https://github.com/user-attachments/assets/a7f3b7a4-0e99-44bc-9b4a-6d88740b05a1) <!-- 이미지 URL 교체 필요 -->

### 2. VirtualBox 네트워크 모드 이해하기

VirtualBox는 가상머신(VM)이 네트워크와 상호작용하는 방식을 결정하는 여러 네트워크 모드를 제공합니다. 각 모드를 이해하는 것은 목적에 맞는 가상 환경을 구축하는 데 중요합니다.

![VirtualBox 네트워크 설정](https://github.com/user-attachments/assets/e65c1e9b-8f8b-428e-9c91-d61121851e0d) <!-- 이미지 URL 교체 필요 -->

- **NAT (Network Address Translation)**
  ![NAT 모드 설명](https://github.com/user-attachments/assets/27e6f3f5-3e1f-40f0-a4d5-1a682239a9e3) <!-- 이미지 URL 교체 필요 -->
  - **개념**: VM이 호스트 PC의 IP 주소를 공유하며, 마치 공유기 뒤에 있는 컴퓨터처럼 작동합니다. 호스트 PC가 인터넷에 연결되어 있다면 VM도 별도 설정 없이 인터넷 사용이 가능합니다.
  - **IP 할당**: 각 VM은 일반적으로 `10.0.2.15` IP 주소를 받으며, 게이트웨이는 `10.0.2.2`입니다.
  - **특징**: 외부에서 VM으로 직접 접근이 불가능하며, VM 간 통신도 기본적으로는 불가능합니다. (포트 포워딩으로 특정 포트 개방 가능)
  - **장점**: 설정이 매우 간편하고, VM이 외부에 노출되지 않아 보안성이 좋습니다.
  - **단점**: VM 간 통신 제한, 외부에서의 직접 접근 불가.
  - **사용 사례**: 단순히 VM에서 인터넷 사용만 필요한 경우, 보안이 중요한 개발 환경.

- **NAT Network**
  ![NAT Network 모드 설명](https://github.com/user-attachments/assets/1733f7a2-4c9f-4014-920a-b145d1243b7c) <!-- 이미지 URL 교체 필요 -->
  - **개념**: NAT 모드와 유사하지만, 같은 'NAT 네트워크' 그룹에 속한 VM들끼리는 서로 통신할 수 있습니다.
  - **특징**: 그룹 내 VM 간 통신 가능, 외부로부터의 접근은 차단.
  - **사용 사례**: 여러 VM이 서로 통신해야 하지만 외부 네트워크와는 분리하고 싶은 테스트 환경.

- **Bridged (브릿지) 모드**
  ![브릿지 모드 설명](https://github.com/user-attachments/assets/e11f7a0f-4e3f-4074-8f9d-5a7b6f0e3b3a) <!-- 이미지 URL 교체 필요 -->
  - **개념**: VM이 호스트 PC와 동일한 네트워크에 연결된 독립적인 컴퓨터처럼 작동합니다. 호스트가 연결된 네트워크의 DHCP 서버로부터 직접 IP 주소를 할당받습니다.
  - **특징**: 호스트와 동일한 네트워크 대역 사용, 별도 설정 없이 VM에 직접 접근 가능 (예: SSH).
  - **장점**: 네트워크 설정의 유연성, VM을 실제 서버처럼 운영 가능.
  - **단점**: VM이 네트워크에 직접 노출되므로 보안 설정 중요, 공인 IP 환경에서는 VM도 공인 IP 필요.
  - **사용 사례**: VM으로 웹 서버, 파일 서버 등을 운영할 때, 네트워크 내 다른 기기와 VM 간 통신이 필요할 때.

- **Internal Network (내부 네트워크)**
  ![내부 네트워크 모드 설명](https://github.com/user-attachments/assets/d1d4b7a0-4e2f-4e8d-8c8b-8a5c3e5b0f0f) <!-- 이미지 URL 교체 필요 -->
  - **개념**: 외부 네트워크는 물론 호스트 PC와도 완전히 분리된, VM들만을 위한 가상의 내부 네트워크를 생성합니다.
  - **특징**: 동일한 '내부 네트워크 이름'을 가진 VM끼리만 통신 가능, 인터넷 접속 불가.
  - **장점**: 완벽한 네트워크 격리로 보안성이 매우 높음.
  - **단점**: 외부 통신 불가.
  - **사용 사례**: 보안 취약점 테스트, 악성코드 분석 등 완전히 격리된 환경이 필요할 때.

- **Host-only Network (호스트 전용 네트워크)**
  ![호스트 전용 네트워크 모드 설명](https://github.com/user-attachments/assets/f0d9b7a4-4e1f-4f8d-8c7b-8a6c3e2b0f1f) <!-- 이미지 URL 교체 필요 -->
  - **개념**: 호스트 PC와 해당 네트워크에 연결된 VM들만 통신할 수 있는 폐쇄적인 네트워크입니다.
  - **특징**: 호스트-VM 간 통신 가능, VM 간 통신 가능, 인터넷 접속은 기본적으로 불가 (호스트의 인터넷 연결 공유 설정 필요).
  - **장점**: 호스트와 VM 간 안전하고 격리된 통신 환경 제공.
  - **단점**: 인터넷 연결을 위해서는 추가 설정 필요.
  - **사용 사례**: 로컬 개발 환경 구축, 호스트와 VM 간 파일 공유 및 테스트.

- **Generic Driver (일반 드라이버)**
  ![일반 드라이버 모드 설명](https://github.com/user-attachments/assets/17e8f7a2-4c8f-4014-920a-b145d1243b7c) <!-- 이미지 URL 교체 필요 -->
  - **개념**: 사용자가 직접 만든 드라이버나 특수한 네트워크 프로토콜(UDP 터널링, VDE 등)을 사용할 때 선택합니다.
  - **사용 사례**: 표준 모드로는 구현할 수 없는 복잡하거나 특수한 네트워크 구성이 필요한 고급 사용자.

- **참고 자료**: [코노님 블로그: VirtualBox 네트워크 종류 및 구성](https://co-no.tistory.com/entry/VirtualBox-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EC%9D%98-%EC%A2%85%EB%A5%98-%EB%B0%8F-%EA%B5%AC%EC%84%B1)

### 3. 네트워크 기본 개념: IP, 서브넷 마스크, 게이트웨이

네트워크를 이해하기 위한 기본적인 세 가지 요소입니다.

- **IP 주소 (Internet Protocol Address)**: 네트워크 상에서 각 장치를 식별하는 고유한 주소입니다. (예: `192.168.1.100`)
- **서브넷 마스크 (Subnet Mask)**: IP 주소에서 네트워크 부분과 호스트 부분을 구분하는 역할을 합니다. 이를 통해 어떤 IP 주소가 같은 네트워크에 속하는지 판단할 수 있습니다. (예: `255.255.255.0`)
- **게이트웨이 (Gateway)**: 현재 네트워크에서 다른 네트워크(주로 인터넷)로 나가는 출입구 역할을 하는 장치(주로 라우터)의 IP 주소입니다. 외부와 통신하려면 게이트웨이 주소를 알아야 합니다. (예: `192.168.1.1`)

예시로 `192.168.1.100` IP와 `255.255.255.0` 서브넷 마스크가 있다면, `192.168.1`까지가 네트워크 부분이고 마지막 `100`이 호스트 부분이 됩니다. 이 장치가 인터넷과 통신하려면 게이트웨이(예: `192.168.1.1`)를 거쳐야 합니다.

- **참고 자료**: [HanSoul님 블로그: IP, 서브넷마스크, 게이트웨이란?](https://hansoul.tistory.com/17)

### 4. Ubuntu Server 22.04 LTS 설치 및 네트워크 설정

스터디 실습으로 Ubuntu Server 22.04.5 LTS 버전을 VirtualBox에 설치했습니다.

- **VM 사양**: CPU 4코어 / 메모리 8GB / 디스크 50GB
- **사용자 계정**: `jinseok` / `jinseok02!` (보안상 실제 환경에서는 더 복잡한 비밀번호 사용 권장)
- **설치 가이드 참고**: [DailyLifeCoding님 블로그: VirtualBox에 Ubuntu Server 설치하기](https://velog.io/@dailylifecoding/installing-ubuntu-server-on-virtual-box)

**고정 IP 설정:**
Ubuntu Server 설치 후, 네트워크 인터페이스에 고정 IP를 할당하는 작업을 진행했습니다. `network-manager` 또는 `netplan`을 사용하여 설정할 수 있습니다. (스터디에서는 `network-manager` 사용 언급됨)

예시 (`netplan` 사용 시 `/etc/netplan/00-installer-config.yaml` 수정):
```yaml
network:
  ethernets:
    enp0s3: # 실제 인터페이스 이름 확인 필요 (ip a 명령어로 확인)
      dhcp4: no # DHCP 비활성화
      addresses:
        - 192.168.1.100/24 # 고정 IP 주소와 서브넷 마스크 (CIDR 표기법)
      gateway4: 192.168.1.1 # 게이트웨이 주소
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4] # DNS 서버 주소
  version: 2
```
수정 후 `sudo netplan apply` 명령어로 적용합니다.

### 5. 문제 해결 (Troubleshooting)

실습 중 발생했던 문제와 해결 과정입니다.

- **문제 1**: 네트워크 인터페이스(`enp0s8`)의 IP 주소를 변경해도 SSH 연결(`enp0s3` 사용)이 끊어지지 않음.
  - **원인**: VirtualBox VM은 여러 네트워크 어댑터를 가질 수 있습니다. SSH 접속에 사용된 인터페이스(`enp0s3`, 주로 NAT)와 IP를 변경한 인터페이스(`enp0s8`, 추가된 어댑터 예: Host-only)가 달랐기 때문에 세션이 유지되었습니다.
  - **확인**: `ip a` 명령어로 각 인터페이스의 IP 주소와 상태를 확인합니다.

- **문제 2**: 집과 학교 등 네트워크 환경이 변경되자 SSH 접속 시 Connection timeout 발생.
  - **원인**: 고정 IP(`192.168.1.100` 등)는 해당 로컬 네트워크 내에서만 유효합니다. 외부 네트워크에서는 해당 IP로 직접 접근할 수 없습니다.
  - **해결**: VirtualBox의 **NAT 포트 포워딩** 기능을 사용했습니다. VM 설정 > 네트워크 > 고급 > 포트 포워딩에서 규칙을 추가합니다. (예: 호스트 IP `127.0.0.1`, 호스트 포트 `2222`, 게스트 IP (비워두거나 VM IP), 게스트 포트 `22`)
  - **접속 방법**: SSH 클라이언트(PuTTY 등)에서 `localhost` 또는 `127.0.0.1` 주소와 호스트 포트(`2222`)를 사용하여 접속합니다. (`ssh jinseok@localhost -p 2222`)
  - **확인**: VM 내에서 `systemctl status ssh` 명령어로 SSH 서비스가 정상 작동하는지 확인하고, `/var/log/auth.log` 등에서 접속 로그를 확인할 수 있습니다.

### 6. 핵심 개념 정리: 가상화 vs 클라우드

- **가상화(Virtualization)**: 하나의 물리적 하드웨어(서버) 자원을 논리적으로 분할하여 여러 개의 독립된 가상 환경(VM)을 생성하는 기술입니다. 물리적 서버의 CPU, 메모리, 스토리지 등을 가상화 소프트웨어(하이퍼바이저, 예: VirtualBox, KVM, VMware)를 통해 나누어 사용합니다.
  - **장점**: 서버 통합으로 비용 절감, 자원 활용률 향상, 테스트 및 개발 환경 구축 용이.

- **클라우드 컴퓨팅(Cloud Computing)**: 가상화된 IT 자원(컴퓨팅 파워, 스토리지, 네트워크, 소프트웨어 등)을 인터넷을 통해 서비스 형태로 제공하고 사용한 만큼 비용을 지불하는 모델입니다. 필요에 따라 자원을 즉시 확장하거나 축소할 수 있는 유연성이 특징입니다.
  - **핵심**: 가상화 기술을 기반으로 하지만, 자동화된 관리, 셀프 서비스, 사용량 기반 과금 등의 특징을 더 가집니다.
  - **종류**: IaaS (Infrastructure as a Service), PaaS (Platform as a Service), SaaS (Software as a Service) 등.

### 7. 추가 학습: 방화벽 기초 (ufw, iptables)

- **ufw (Uncomplicated Firewall)**: Ubuntu에서 사용하기 쉬운 방화벽 설정 도구입니다. `sudo ufw enable`, `sudo ufw allow 22/tcp`, `sudo ufw status` 등의 명령어로 기본적인 방화벽 규칙을 관리할 수 있습니다.
- **iptables**: Linux 커널 수준에서 동작하는 강력한 패킷 필터링 도구입니다. 복잡하지만 세밀한 네트워크 규칙 설정이 가능합니다. ufw는 내부적으로 iptables를 사용하여 동작하는 경우가 많습니다.

---

### 스터디 중 진행한 실습 완료 항목

- [x] VirtualBox 설치 ✅ 2025-03-19
- [x] VirtualBox 네트워크 종류 조사 ✅ 2025-03-20
- [x] IP 대역, 서브넷 마스크, 게이트웨이 조사 ✅ 2025-03-21
- [x] Ubuntu 22.04.3 Server 설치 (4코어/8GB/50GB) 및 고정 IP 설정 ✅ 2025-03-19

### 다음 주 과제 (2주차)

- [ ] **HAProxy 학습 및 설치**: 리버스 프록시 개념을 이해하고 HAProxy를 설치하여 기본 설정을 구성합니다.
- [ ] **Docker 설치 및 WordPress 실행**: Ubuntu에 Docker를 설치하고 WordPress 컨테이너를 실행합니다. (포트 80 사용)
- [ ] **HAProxy + WordPress 연동**: 사용자가 HAProxy를 통해 WordPress에 접속할 수 있도록 구성합니다. (`사용자 -> HAProxy (예: 80) -> Docker WordPress (80)`) 