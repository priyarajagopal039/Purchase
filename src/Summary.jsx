import React, { Component } from 'react';
import './Summary.css';
import testData from './test-data.json';
import Flyout from './Flyout';

class Summary extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            visible: false,
            isPromoCodeVisible: false,
            isProductVisible: false,
            promoSection: 'Apply promo code',
            total: testData.summary.grandTotal,
            promoMessage: '',
            isPromoMessageUpdated: false
        };
        this.handleFlyout = this.handleFlyout.bind(this);
        this.handlePromoSection = this.handlePromoSection.bind(this);
        this.handleProductSection = this.handleProductSection.bind(this);
        this.handleApplyPromotion = this.handleApplyPromotion.bind(this);
    };

    returnQtyTotal() {
        let qtyTotal = testData.summary.quantityTotal;
        if (qtyTotal > 1) {
            return '(' + qtyTotal.toString() + ' items)';
        } else {
            return '(' + qtyTotal.toString() + ' item)';
        }
    };

    reCalculateTotal() {
        let promoCode = document.getElementById('promoCode');
        let newTotal = 0;
        if (promoCode.value.toLowerCase() === 'discount') {
            let pickupDiscount = testData.summary.pickupDiscount.toFixed(2);
            let subTotal = testData.summary.subTotal.toFixed(2);
            let merchandisingFees = testData.summary.merchandisingFeesTotal.toFixed(2);
            let tax = testData.summary.taxTotal.toFixed(2);
            let promoDiscount = (subTotal * 10) / 100;
            debugger;
            let totalDiscount = parseFloat(pickupDiscount) + parseFloat(promoDiscount);
            newTotal = (parseFloat(subTotal) + parseFloat(merchandisingFees) + parseFloat(tax)) - totalDiscount;
        } else {
            this.setState({
                promoMessage: 'Invalid Promo Code',
                isPromoMessageUpdated: true
            });
        }

        if (newTotal === this.state.total) {
            console.log('Promo already applied');
            this.setState({
                promoMessage: 'Promotion code already applied!',
                isPromoMessageUpdated: true
            });
        } else {
            this.setState({
                total: newTotal,
                promoMessage: 'Promotion code applied successfully',
                isPromoMessageUpdated: true
            });
        }
    };

    toggleFlyout() {
        this.setState({
            visible: !this.state.visible
        });
    };

    togglePromoCode() {
        this.setState({
            isPromoCodeVisible: !this.state.isPromoCodeVisible
        });
    };

    toggleProductSection() {
        this.setState({
            isProductVisible: !this.state.isProductVisible
        });
    };

    handlePromoSection(e) {
        this.togglePromoCode();
        if (!this.state.isPromoCodeVisible) {
            this.setState({
                promoSection: 'Hide promo code'
            });
        } else {
            this.setState({
                promoSection: 'Apply promo code'
            });
        }
        console.log('Promo section clicked' + this.state.isPromoCodeVisible);
        e.stopPropagation();
    };

    handleProductSection(e) {
        this.toggleProductSection();
        console.log('Product accordion clicked' + this.state.isProductVisible);
        e.stopPropagation();
    };

    handleFlyout(e) {
        this.toggleFlyout();
        console.log('Pickup Savings flyout clicked' + this.state.visible);
        e.stopPropagation();
    };

    handleApplyPromotion(e) {
        this.reCalculateTotal();
        e.stopPropagation();
    };

    render() {
        let isVisible = '';
        if (this.state.visible) {
            isVisible = "show";
        }
        return (
            <div className='table'>
                <div id='subtotal' className='row block-display'>
                    <div className='cols inline-block left-align'>
                        SubTotal {this.returnQtyTotal()}
                    </div>
                    <div className='cols inline-block right-align'>
                        ${testData.summary.subTotal.toFixed(2)}
                    </div>
                </div>
                <div className='row block-display'>
                    <div className='cols inline-block left-align'>
                        <button id='flyout' className={isVisible} onMouseDown={this.handleFlyout}>
                            Pickup savings
                        <Flyout handleMouseDown={this.handleFlyout} visibility={this.state.visible} />
                        </button>
                    </div>
                    <div className='cols inline-block right-align discount'>
                        ${testData.summary.pickupDiscount.toFixed(2)}
                    </div>
                </div>
                <div className='row block-display'>
                    <div className='cols inline-block left-align'>
                        Merchandising fee
                    </div>
                    <div className='cols inline-block right-align'>
                        ${testData.summary.merchandisingFeesTotal.toFixed(2)}
                    </div>
                </div>
                <div className='row block-display'>
                    <div className='cols inline-block left-align'>
                        Est. taxes & fees
                    </div>
                    <div className='cols inline-block right-align'>
                        ${testData.summary.taxTotal.toFixed(2)}
                    </div>
                </div>
                <div className="divider" />
                <div className='row block-display'>
                    <div className='cols inline-block left-align'>
                        Est. Total
                    </div>
                    <div className='cols inline-block right-align'>
                        ${this.state.total.toFixed(2)}
                    </div>
                </div>
                <div className="divider" />
                <div className='row block-display'>
                    <div className='cols left-align'>
                        <button className={'collapsible ' + (this.state.isPromoCodeVisible ? 'active' : '')} onMouseDown={this.handlePromoSection}>{this.state.promoSection}</button>
                    </div>
                    <div className={'content ' + (this.state.isPromoCodeVisible ? 'show' : '')}>
                        <form className='promoCodeForm'>
                            <input type='text' placeholder='Enter Promo code' id='promoCode' />
                            <button id="applyButton" onClick={this.handleApplyPromotion}>Apply</button>
                        </form>
                    </div>
                </div>
                <div className={'row' + (this.state.isPromoMessageUpdated ? 'showPromotionMessage' : 'hidePromotionMessage')}>
                    <div className='cols left-align'>{this.state.promoMessage}</div>
                </div>
                <div className="divider" />
                <div className='row block-display'>
                    <div className='cols inline-block left-align'>

                    </div>
                    <div className='cols inline-block right-align'>
                        ${testData.summary.taxTotal.toFixed(2)}
                    </div>
                </div>
            </div >

        );
    }
}

export default Summary;