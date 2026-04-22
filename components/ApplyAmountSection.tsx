"use client";

import { useState } from "react";

export default function ApplyAmountSection() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [installment, setInstallment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="commonSection applyAmoutSec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec_title">
              Get your amount
              <br /> for fillup this form
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="applyamountFrom">
              <form action="#" method="post" onSubmit={handleSubmit}>
                <input
                  type="number"
                  step="any"
                  name="amount"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  type="number"
                  step="any"
                  name="months"
                  placeholder="Long of months?"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
                <input
                  type="number"
                  step="any"
                  name="installment"
                  placeholder="Installment amount."
                  value={installment}
                  onChange={(e) => setInstallment(e.target.value)}
                />
                <button className="common_btn" type="submit">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
