module.exports = function generatePDFHtml({ user, contas, cartoes }) {
    let totalReceitas = 0;
    let totalDespesasContas = 0;
    let totalDespesasCartoes = 0;
  
    const formatMoney = valor => `R$ ${valor.toFixed(2)}`;
  
    const contasHtml = contas.map(conta => {
      const somaReceitas = conta.receitas.reduce((acc, r) => acc + r.valor, 0);
      const somaDespesas = conta.despesas.reduce((acc, d) => acc + d.valor, 0);
  
      totalReceitas += somaReceitas;
      totalDespesasContas += somaDespesas;
  
      return `
        <h2>Conta: ${conta.nome}</h2>
        <p><strong>Receitas:</strong></p>
        <table>
          <tr><th>Descrição</th><th>Valor</th><th>Data</th></tr>
          ${conta.receitas.map(r => `
            <tr>
              <td>${r.descricao}</td>
              <td>${formatMoney(r.valor)}</td>
              <td>${new Date(r.data).toLocaleDateString()}</td>
            </tr>`).join('')}
        </table>
  
        <p><strong>Despesas:</strong></p>
        <table>
          <tr><th>Descrição</th><th>Valor</th><th>Data</th></tr>
          ${conta.despesas.map(d => `
            <tr>
              <td>${d.descricao}</td>
              <td>${formatMoney(d.valor)}</td>
              <td>${new Date(d.data).toLocaleDateString()}</td>
            </tr>`).join('')}
        </table>
  
        <p><strong>Total Receita:</strong> ${formatMoney(somaReceitas)} |
           <strong>Total Despesa:</strong> ${formatMoney(somaDespesas)}</p>
      `;
    }).join('');
  
    const cartoesHtml = cartoes.map(cartao => {
      const somaDespesas = cartao.despesas.reduce((acc, d) => acc + d.valor, 0);
      totalDespesasCartoes += somaDespesas;
  
      return `
        <h2>Cartão: ${cartao.nome}</h2>
        <table>
          <tr><th>Descrição</th><th>Valor</th><th>Data</th></tr>
          ${cartao.despesas.map(d => `
            <tr>
              <td>${d.descricao}</td>
              <td>${formatMoney(d.valor)}</td>
              <td>${new Date(d.data).toLocaleDateString()}</td>
            </tr>`).join('')}
        </table>
        <p><strong>Total Despesas:</strong> ${formatMoney(somaDespesas)}</p>
      `;
    }).join('');
  
    const saldoFinal = totalReceitas - (totalDespesasContas + totalDespesasCartoes);
  
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2, h3 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h1>Relatório Financeiro de ${user.nome}</h1>
  
          ${contasHtml}
          <hr />
          ${cartoesHtml}
  
          <hr />
          <h3>Total Geral de Receitas: ${formatMoney(totalReceitas)}</h3>
          <h3>Total Geral de Despesas (Contas): ${formatMoney(totalDespesasContas)}</h3>
          <h3>Total Geral de Despesas (Cartões): ${formatMoney(totalDespesasCartoes)}</h3>
          <h2>Saldo Final: ${formatMoney(saldoFinal)}</h2>
        </body>
      </html>
    `;
  };