import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this); //데이터 추가
        this.handleRemove = this.handleRemove.bind(this); //데이터 제거
        this.handleEdit = this.handleEdit.bind(this); //데이터 수정
    }

    handleChange(e) {
      this.setState({
        keyword: e.target.value
      });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        });

        console.log(key, 'is selected');
    }

    handleCreate(contact) {
      this.setState({
        contactData: update(this.state.contactData, { $push: [contact] })
      });
    }

    handleRemove() {
      if(this.state.selectedKey < 0) {
          return;
      }
      this.setState({
          contactData: update(this.state.contactData,
              { $splice: [[this.state.selectedKey, 1]] }
          ),
          selectedKey: -1 //무효화
      });
    }

    //이름하고 전화번호 수정 메소드
    handleEdit(name, phone) {
      this.setState({
          contactData: update(this.state.contactData,
              {
                [this.state.selectedKey]: {
                    name: { $set: name },
                    phone: { $set: phone }
                }
              }
          )
      })
    }

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
              (contact) => {
                return contact.name.toLowerCase()
                    .indexOf(this.state.keyword.toLowerCase()) > -1;
              }
            );
            return data.map((contact, i) => {
                return (<ContactInfo
                            contact={contact}
                            key={i}
                            onClick={() => this.handleClick(i)}/>);
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search" //검색 상자 안에 출력할 내용
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
